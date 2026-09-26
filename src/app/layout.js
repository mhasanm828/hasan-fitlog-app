import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "./component/Navber";
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hasan FitLog Application",
  description: "Workout Library & My Plan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable}`}
    >
      <body className="min-h-screen bg-[#0B0F14] text-white flex flex-col">
        <PlanProvider>
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
}