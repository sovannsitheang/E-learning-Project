import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "G4-Learning | Free Online Learning Platform",
  description:
    "Free digital lessons for students across Cambodia, aligned with the national curriculum.",
  openGraph: {
    title: "G4-Learning | Free Online Learning Platform",
    description:
      "Free digital lessons for students across Cambodia, aligned with the national curriculum.",
    url: "https://e-learning-project-ivory.vercel.app",
    siteName: "G4-Learning",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "G4-Learning Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "G4-Learning | Free Online Learning Platform",
    description:
      "Free digital lessons for students across Cambodia, aligned with the national curriculum.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
