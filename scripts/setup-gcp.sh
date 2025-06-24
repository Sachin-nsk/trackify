#!/bin/bash

# GCP Setup script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ID=${1:-"your-gcp-project-id"}
REGION=${2:-"us-central1"}
DB_INSTANCE_NAME="trackify-db"
DB_NAME="trackify"
DB_USER="trackify_user"

echo -e "${GREEN}🚀 Setting up GCP infrastructure for Trackify...${NC}"

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Create Cloud SQL instance
echo -e "${YELLOW}🗄️  Creating Cloud SQL PostgreSQL instance...${NC}"
gcloud sql instances create $DB_INSTANCE_NAME \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=$REGION \
    --storage-type=SSD \
    --storage-size=10GB \
    --storage-auto-increase \
    --backup-start-time=03:00 \
    --maintenance-window-day=SUN \
    --maintenance-window-hour=04 \
    --maintenance-release-channel=production \
    --deletion-protection || echo "Instance might already exist"

# Create database
echo -e "${YELLOW}📊 Creating database...${NC}"
gcloud sql databases create $DB_NAME --instance=$DB_INSTANCE_NAME || echo "Database might already exist"

# Generate random password
DB_PASSWORD=$(openssl rand -base64 32)

# Create database user
echo -e "${YELLOW}👤 Creating database user...${NC}"
gcloud sql users create $DB_USER \
    --instance=$DB_INSTANCE_NAME \
    --password=$DB_PASSWORD || echo "User might already exist"

# Get connection name
CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE_NAME --format="value(connectionName)")

# Create secrets in Secret Manager
echo -e "${YELLOW}🔐 Creating secrets in Secret Manager...${NC}"

# Database URLs
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?host=/cloudsql/${CONNECTION_NAME}"
DIRECT_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?host=/cloudsql/${CONNECTION_NAME}"

echo -n "$DATABASE_URL" | gcloud secrets create DATABASE_URL --data-file=- || echo "Secret might already exist"
echo -n "$DIRECT_URL" | gcloud secrets create DIRECT_URL --data-file=- || echo "Secret might already exist"

# Create placeholder secrets (you'll need to update these with real values)
echo -n "your-clerk-secret-key" | gcloud secrets create CLERK_SECRET_KEY --data-file=- || echo "Secret might already exist"
echo -n "your-gemini-api-key" | gcloud secrets create GEMINI_API_KEY --data-file=- || echo "Secret might already exist"
echo -n "your-resend-api-key" | gcloud secrets create RESEND_API_KEY --data-file=- || echo "Secret might already exist"
echo -n "your-arcjet-key" | gcloud secrets create ARCJET_KEY --data-file=- || echo "Secret might already exist"
echo -n "your-inngest-event-key" | gcloud secrets create INNGEST_EVENT_KEY --data-file=- || echo "Secret might already exist"
echo -n "your-inngest-signing-key" | gcloud secrets create INNGEST_SIGNING_KEY --data-file=- || echo "Secret might already exist"

echo -e "${GREEN}✅ GCP infrastructure setup completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "1. Update the secrets in Secret Manager with your actual API keys:"
echo -e "   ${YELLOW}gcloud secrets versions add CLERK_SECRET_KEY --data-file=<your-key-file>${NC}"
echo -e "2. Update cloudbuild.yaml with your project ID"
echo -e "3. Run the deployment script: ${YELLOW}./scripts/deploy.sh $PROJECT_ID${NC}"
echo -e ""
echo -e "${BLUE}📊 Database connection details:${NC}"
echo -e "Instance: $DB_INSTANCE_NAME"
echo -e "Database: $DB_NAME"
echo -e "User: $DB_USER"
echo -e "Connection Name: $CONNECTION_NAME"