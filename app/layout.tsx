/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./globals.css";
import { Roboto, Cairo } from "next/font/google";
import { useEffect, useState } from "react";
import i18n from "@/i18n";
import { useLanguageStore } from "../stores/languageStore";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const roboto = Roboto({
  subsets: ["latin"], // Add subsets as required
  weight: ["400", "700"], // Specify font weights
  variable: "--font-roboto", // Add a custom CSS variable
});

const cairo = Cairo({
  subsets: ["arabic"], // Add the Arabic subset
  weight: ["400", "700"], // Specify font weights (e.g., regular and bold)
  variable: "--font-cairo", // Use a custom CSS variable for the font
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [lang, setLang] = useState("en"); // Default language is English
  const { language, setLanguage } = useLanguageStore();

  const { ready } = useTranslation();

  useEffect(() => {
    // Get saved language from localStorage or fallback to browser language
    const savedLanguage =
      Cookies.get("language") || navigator.language.split("-")[0] || "en";
    const validLanguage = ["en", "fr", "ar"].includes(savedLanguage)
      ? savedLanguage
      : "en";
    setLanguage(validLanguage);

    // Change language in i18n
    i18n
      .changeLanguage(validLanguage)
      .catch((err: any) => console.error("Error changing language:", err));

    // Set direction based on language
    document.documentElement.lang = validLanguage;
    document.documentElement.dir = validLanguage === "ar" ? "rtl" : "ltr";
    setLang(validLanguage);

  }, [language, setLanguage, ready]);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={
          lang === "ar"
            ? ` ${cairo.variable} antialiased arabicFont bg-slate-100`
            : ` ${roboto.variable} antialiased LatinFont bg-slate-100`
        }
      >
          {children}
      </body>
    </html>
  );
}
