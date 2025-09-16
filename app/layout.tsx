import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduCRM - Educational Customer Relationship Management",
  description: "Modern CRM system for educational institutions. Manage students, leads, fees, and analytics in one place.",
  keywords: ["education", "CRM", "student management", "coaching center", "school management"],
  authors: [{ name: "EduCRM Team" }],
  creator: "EduCRM",
  publisher: "EduCRM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://educrm.com"),
  openGraph: {
    title: "EduCRM - Educational CRM System",
    description: "Modern CRM system for educational institutions",
    url: "https://educrm.com",
    siteName: "EduCRM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduCRM - Educational CRM System",
    description: "Modern CRM system for educational institutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
