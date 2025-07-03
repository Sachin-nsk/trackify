# 💸 Trackify – AI-Powered Expense & Income Tracker

Trackify is a full-stack, AI-powered finance tracking application that helps users manage income, expenses, and account balances with personalized recommendations using Google Gemini AI.

Deployed with Docker on Google Cloud Run and built using modern tools like Next.js, Prisma, Clerk, and Supabase, Trackify is designed for speed, scalability, and simplicity.


---
## Screenshots

![Home](https://github.com/user-attachments/assets/6ac273c3-50b1-470e-bb8a-55b3ac96be70)

![Tools](https://github.com/user-attachments/assets/fee4f900-c680-4e05-9909-a852075afa00)

![Dashboard](https://github.com/user-attachments/assets/580065c7-ecaf-4337-b92f-fe2c4939a189)

![Transactions](https://github.com/user-attachments/assets/c5160697-90e5-4ae1-b38b-78007dc5442a)





---

## 🚀 Features

- 🔐 **User Authentication** – Secure sign-up and login with Clerk
- 💰 **Real-time Finance Tracking** – Log and visualize income, expenses, and balances
- 🤖 **AI Suggestions** – Personalized money-saving tips via Gemini AI
- 📊 **Data Visualizations** – Clean charts for insights into financial habits
- ☁️ **Cloud Deployment** – Fast, reliable, and scalable via GCP Cloud Run
- 🐳 **Dockerized Infrastructure** – Easily portable and production-ready

---

## 🛠️ Tech Stack

| Layer           | Tools & Services                                   |
|-----------------|----------------------------------------------------|
| Frontend        | Next.js 15                                         |
| Backend         | Prisma ORM, Supabase (PostgreSQL)                  |
| Authentication  | Clerk                                              |
| AI Integration  | Google Gemini API                                  |
| Deployment      | Docker, Google Cloud Platform (Cloud Run)          |

---

## 🌐 Live Demo

👉 [**Try Trackify Now**](https://trackify-app-999910686309.asia-south1.run.app)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/trackify.git
cd trackify
```

### 2️⃣ Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3️⃣ Set environment variables
Create a .env file:
```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=  # Supabase connection string (connection pool)
DIRECT_URL=    # Supabase direct connection (for Prisma migrations)

# AI + Email
GEMINI_API_KEY=
RESEND_API_KEY=

# Optional: Arcjet API key (if used for edge security)
ARCJET_KEY=
```


### 4️⃣ Generate Prisma client
```bash
npx prisma generate
```

### 5️⃣ Start the app
```bash
npm run dev
```



