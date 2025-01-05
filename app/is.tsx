 

"use client";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import i18n from "@/i18n";
import { useLanguageStore } from "@/stores/languageStore";


export function LanguageSwitcher({ children }: {
  children: (handleSelection: (language: string) => void) => React.ReactNode;
}) {
  const { setLanguage } = useLanguageStore();
  const sss = useRef<string>("");

  useEffect(() => {
    const savedLanguage = Cookies.get("language") || "en";
    sss.current = savedLanguage;
    i18n.changeLanguage(savedLanguage);
    setLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [setLanguage]);

  const handleSelection = (selectedLanguage: string) => {
    console.log(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    Cookies.set("language", selectedLanguage, { expires: 365 });
    setLanguage(selectedLanguage);
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  };

  return <>{sss.current !== "" ? children(handleSelection) : null}</>;
}
