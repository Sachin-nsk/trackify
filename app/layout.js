import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Trackify - Smart Financial Management",
  description: "AI-powered financial platform for intelligent expense tracking, budgeting, and financial insights",
  keywords: "finance, budgeting, expense tracking, AI, financial management",
  authors: [{ name: "Sachin Kumar N" }],
  creator: "Sachin Kumar N",
  openGraph: {
    title: "Trackify - Smart Financial Management",
    description: "Transform your financial life with AI-powered insights and smart budgeting tools",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trackify - Smart Financial Management",
    description: "AI-powered financial platform for intelligent expense tracking and budgeting",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8b5cf6",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased`}>
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {children}
          </main>
          
          {/* Toast Notifications */}
          <Toaster 
            richColors 
            position="top-right"
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
              },
            }}
          />
          
          {/* Footer */}
          <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <span className="text-2xl font-bold text-gradient">Trackify</span>
                  </div>
                  <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                    Empowering individuals to take control of their financial future through 
                    intelligent tracking, smart budgeting, and AI-powered insights.
                  </p>
                 
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><a href="/dashboard" className="text-gray-300 hover:text-violet-400 transition-colors">Dashboard</a></li>
                    <li><a href="/tool" className="text-gray-300 hover:text-violet-400 transition-colors">Financial Tools</a></li>
                    <li><a href="/transaction/create" className="text-gray-300 hover:text-violet-400 transition-colors">Add Transaction</a></li>
                  </ul>
                </div>

                
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className=" text-gray-400 text-sm ">
                  © Trackify. Made with ❤️ by Sachin Kumar N
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}