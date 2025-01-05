"use client"
// import { LoginForm } from "@/app/components/login-form"
import { Mail, PhoneIcon } from "lucide-react"
import Link from "next/link";

import { useTranslation } from "react-i18next";

import {  Button, buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    




<div>



                  <div className="relative my-5 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {t('auth.LoginBy')}
            </span>
          </div>

        <div className="grid gap-6 mt-5 sm:grid-cols-2">
          <Button asChild  size="icon" className="w-full text-sm font-medium"> 
            <Link href="/auth/login/email">
            <Mail />
            </Link>
          </Button>
         
          <Link href="/auth/login/phone" className={`${buttonVariants({ variant: "outline", size: "icon" })} w-full  text-sm font-medium`} >
      <PhoneIcon />
              {/* {t('auth.phone')} */}
          
          </Link>
          
       
        </div>

        </div>


        
  )
}
