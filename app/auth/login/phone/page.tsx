"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";


export default function LoginPage() {
  const { t } = useTranslation();
  return (
    // <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div className="my-24">
    <div className="w-full max-w-sm">
    <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="phone"> {t('auth.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="011000000"
                required
              />
            </div>
            <div className="flex flex-row gap-6">
              
              
              
               <Button asChild variant="ghost" className="w-full">
                <Link href="/auth/login">
                <ChevronLeft />
<span> {t('auth.Back')}</span>
                </Link>

             
            </Button>
            
            
            <Button type="submit" className="w-full">
           
            <span>  {t('auth.Login')} </span>  <ChevronRight />
            </Button></div>
           
          </div>
      </div>
    </div>
  )
}
