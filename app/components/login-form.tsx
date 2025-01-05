"use client";
// import { GalleryVerticalEnd } from "lucide-react"
// import Image from "next/image";
// import { cn } from "@/lib/utils"
import {  ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "react-i18next";
import Link from "next/link";





export function LoginForm() {
  const { t } = useTranslation();
  return (
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label className="text-gray-800" htmlFor="email"> {t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@ratpdev.com"
                required
              />
            </div>
            <div className="flex flex-row gap-6">
              
              
              
               <Button asChild className="w-full">
                <Link href="/auth/login">
                <ChevronLeft />
<span> {t('auth.Back')}</span>
                </Link>

             
            </Button>
            
            
            <Button type="submit" className="w-full">
           
            <span>  {t('auth.Login')} </span>  <ChevronRight />
            </Button></div>
           
          </div>
          
      
  )
}
