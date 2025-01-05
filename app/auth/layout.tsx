/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// import { LoginForm } from "@/app/components/login-form"

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ChangeLang from "@/app/components/changLang"
import { useEffect, useState } from "react";

export default function LoginLayout({
    children,
  }:any) {
    
  const { t } = useTranslation();
  const { ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, [ready]);

  
  return <>
     {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1>Loading...</h1>
          </div>
        ) : (
   
       



    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-100 p-6 md:p-10 bg-[url('/worldmap2.svg')] bg-cover bg-center" >

      <div className="w-full max-w-sm">
        {/* <LoginForm /> */}
          <div className="flex flex-col items-center gap-2">
                    <a
                      href="#"
                      className="flex flex-col items-center gap-2 font-medium"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md">
                        <Image src="/logo.svg" className="size-max"  alt="Next.js logo" width={300} height={150} />
                        {/* <GalleryVerticalEnd className="size-6" /> */}
                      </div>
                      <span className="sr-only">Acme Inc.</span>
                    </a>
                    <h1 className="text-xl font-bold">{t('auth.welcome') }</h1>
                    <div className="text-center text-sm">
                      {t('auth.appName')}
                      {/* Don&apos;t have an account?{" "}
                      <a href="#" className="underline underline-offset-4">
                        Sign up
                      </a> */}
                    </div>
                  </div>

              

       {children}

       
        <div className="relative my-5 mt-20 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-transparent px-2 text-muted-foreground">
              {t('auth.Language')}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">

  <ChangeLang />
        

          </div>
      
      </div><div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        {t('auth.Byclicking')} <Link href="/auth/terms">{t('auth.TermsofService')}</Link> {" "}
        {t('auth.and')} <a href="#">{t('auth.PrivacyPolicy')}</a>.
      </div>
    </div>

  )}
</>
}
