import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040814",
};

export const metadata = {
  metadataBase: new URL("https://wael-portfolio-nine.vercel.app"),
  title: "Wael Al Shallah | Senior Creative Front-End Specialist",
  description: "Senior Creative Front-End Specialist architecting scalable, high-performance web applications with Next.js, React, and TypeScript.",
  keywords: ["Wael Al Shallah", "وائل الشلاح", "Front-End Engineer", "Next.js Developer", "React Architect", "TypeScript Specialist", "Web Development"],
  authors: [{ name: "Wael Al Shallah" }],
  creator: "Wael Al Shallah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wael-portfolio-nine.vercel.app",
    siteName: "Wael Al Shallah Portfolio",
    title: "Wael Al Shallah | Senior Creative Front-End Specialist",
    description: "Senior Creative Front-End Specialist architecting scalable, high-performance web applications with Next.js, React, and TypeScript.",
    images: [
      {
        url: "/image/wael sh.webp",
        width: 1200,
        height: 630,
        alt: "Wael Al Shallah - Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wael Al Shallah | Senior Creative Front-End Specialist",
    description: "Senior Creative Front-End Specialist architecting scalable, high-performance web applications with Next.js, React, and TypeScript.",
    creator: "@waels76872",
    images: ["/image/wael sh.webp"],
  },
  icons: {
    icon: "/image/logo.svg",
    apple: "/image/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
