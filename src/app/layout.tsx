import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hardik Donda | Full Stack Developer | Java | Spring Boot | Next.js | AWS",
  description:
    "Full Stack Developer with 3.5+ years of experience. Specialized in Java, Spring Boot, Node.js, React, Next.js, PostgreSQL, and AWS. AWS Certified Developer.",
  keywords: [
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "Next.js",
    "React",
    "AWS",
    "Node.js",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Hardik Donda" }],
  openGraph: {
    title: "Hardik Donda | Full Stack Developer",
    description:
      "Full Stack Developer with 3.5+ years of experience. Specialized in Java, Spring Boot, Node.js, React, Next.js, PostgreSQL, and AWS.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik Donda | Full Stack Developer",
    description:
      "Full Stack Developer with 3.5+ years of experience. Specialized in Java, Spring Boot, Node.js, React, Next.js, PostgreSQL, and AWS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
