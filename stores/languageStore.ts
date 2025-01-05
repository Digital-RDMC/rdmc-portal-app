import {create} from "zustand";

interface LanguageStore {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en", // Default language
  setLanguage: (lang: string) => set({ language: lang }),
}));
