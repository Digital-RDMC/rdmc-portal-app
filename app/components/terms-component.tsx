"use client";
// import { GalleryVerticalEnd } from "lucide-react"
// import Image from "next/image";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next";
import ChangeLang from "@/app/components/changLang"
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


export default function Terms({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
 
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            
            <h3 className="text-lg font-bold">{t('auth.Terms_and_Conditions') } </h3>
            <div className="text-center text-sm">
              {t('auth.Last_updated')}
              {/* Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a> */}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
             
            </div>
            <Button asChild  className="w-full bg-color1 text-color1-foreground">
            <Link href="/auth/login">
            <ChevronLeft />
             {t('auth.BackToLogin')}
            </Link>
             
            </Button>

            
            
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {t('auth.Language')}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
<ChangeLang />

{/* 
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button> */}
          </div>
        </div>


      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 text-xs leading-5">

<p className="">{ t('auth.WelcometoRDMCPortalPleaseread')} <b>{ t('auth.RATPDevMobilityCairo')}</b></p>

<p  className="text-xs leading-5">{ t('auth.ByaccessingorusingourService')}</p>

<p className="font-weight-black">1. Acceptance of Terms</p>
<p className="mb-3">By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
<p className="font-weight-black">2. Eligibility</p>
<p className="mb-3">You must be at least [18] (eighteen) years of age to use our Service. By agreeing to these Terms, you represent that you are of legal age to form a binding contract. Guardians of minors shall be held liable for any unauthorized access to our Service and any resulting consequences therefrom.</p>
<p className="font-weight-black">3. Account Registration and Security</p>
<ul role="list" className="divide-y divide-transparent">
  <li className="flex justify-between gap-x-6 py-5">
  <div className="flex min-w-0 gap-x-4">
  <div className="size-3 mt-5 flex-none rounded-full bg-gray-400 flex items-center justify-center">
        
      </div>
            <div className="min-w-0 flex-auto">
                 You may be required to create an account to use certain parts of our Service. You agree to provide accurate and complete information and to keep it up-to-date.

            </div>
          </div>
          </li>

  <li>You are responsible for maintaining the confidentiality of your account and password/OTP/Token and for restricting access to your device.</li>
</ul>
{/* <v-list className="bg-transparent">
  <v-list-item>
    <v-icon>mdi-vector-point</v-icon>
    
  </v-list-item>
  <v-list-item><v-icon>mdi-vector-point</v-icon>You are responsible for maintaining the confidentiality of your account and password/OTP/Token and for restricting access to your device.</v-list-item>
  <v-list-item><v-icon>mdi-vector-point</v-icon>We reserve the right to terminate or suspend any account that violates these Terms.</v-list-item>
</v-list> */}


<p className="font-weight-black">4. Intellectual Property</p>
<p className="mb-3">• All content, designs, text, graphics, images, and any other materials on our Service are owned by or licensed to RATP Dev. Mobility Cairo and are protected by copyright, trademark, and other intellectual property laws.
• You agree not to reproduce, duplicate, copy, sell, resell, or exploit any part of the Service without our express written permission.</p>
<p className="font-weight-black">5. User Conduct</p>
<p className="mb-3">You agree not to:
• Use the Service for any unlawful purpose or in violation of any applicable laws.
• Impersonate any person or entity or misrepresent your affiliation with a person or entity.
• Interfere with or disrupt the operation of the Service or servers/networks connected to it.
• RATP Dev. Mobility Cairo shall not be liable for the actions of third party Users.
• By using the Service, you acknowledge that you have read and understood these Terms and obtained an Arabic translation thereof if necessary.</p>
<p className="font-weight-black">6. Termination</p>
<p className="mb-3">We may suspend or terminate your access to the Service at any time without notice if we believe you have violated these Terms.</p>
<p className="font-weight-black">7. Limitation of Liability</p>
<p className="mb-3">• To the maximum extent permitted by applicable law, RATP Dev. Mobility Cairo and its affiliates will not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the Service.</p>
<p className="font-weight-black">8. Changes to the Terms</p>
<p className="mb-3">We reserve the right to modify or replace these Terms at any time. We will post the revised Terms on this page, and any changes will be effective upon posting.</p>
<p className="font-weight-black">9. Governing Law</p>
<p className="mb-3">These Terms are governed by the laws of [EGYPT], without regard to conflict of law principles. In the event of any dispute resulting from the interpretation or breach of these Terms, such dispute will be referred to litigation before the Egyptian courts of competent jurisdiction.</p>
<p className="font-weight-black">10. Contact Us</p>
<p className="mb-3">If you have any questions about these Terms, please contact us at [email address or phone number].</p>





<Button className="w-full">
              {t('auth.BackToLogin')}
            </Button>

      </div>


      </div>

    </div>
  )
}
