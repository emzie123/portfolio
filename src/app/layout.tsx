import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Emilita D. Cristobal — UI/UX Designer",
    template: "%s | Emilita D. Cristobal",
  },
  description:
    "Portfolio of Emilita D. Cristobal — UI/UX Designer crafting thoughtful, elegant digital experiences across web, mobile, and product design.",
  keywords: [
    "UI/UX Designer",
    "Portfolio",
    "Emilita Cristobal",
    "Web Design",
    "Mobile Design",
    "Product Design",
  ],
  authors: [{ name: "Emilita D. Cristobal" }],
  openGraph: {
    title: "Emilita D. Cristobal — UI/UX Designer",
    description:
      "Crafting thoughtful, elegant digital experiences across web, mobile, and product design.",
    type: "website",
    locale: "en_US",
  },
};

import { ContactProvider } from "@/components/ContactModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ContactProvider>
          <Header />
          <main style={{ paddingTop: "var(--header-height)" }}>{children}</main>
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
