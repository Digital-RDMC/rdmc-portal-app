 
"use client";

import { AppSidebar } from "@/app/user/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLanguageStore } from "@/stores/languageStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useRouter } from "next/navigation";

const fetchFingerprint = async (): Promise<string | null> => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId || null;
  } catch (error) {
    console.error("Error fetching fingerprint:", error);
    return null;
  }
};

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { ready } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const initializeFingerprint = async () => {
      const finger = await fetchFingerprint();
      setFingerprint(finger);
    };
    initializeFingerprint();
  }, []);

  useEffect(() => {
    if (fingerprint) {
      const fetchData = async () => {
        try {
          const url = `/api/emplog?fingerPrint=${fingerprint}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const { result } = await response.json();
          const isWithin30Minutes = (timestamp: string): boolean => {
            const currentTime = new Date().getTime(); // Current time in milliseconds
            const dataTime = new Date(timestamp).getTime(); // Convert timestamp to milliseconds
            const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
            return currentTime < dataTime + thirtyMinutes;
          };
  
          if (isWithin30Minutes(result.timestamp) && result.verified) {
            setIsLogin(true);
          }else{
            setIsLogin(false);
            router.push("/auth/login")
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      // Start polling every 5 seconds if `result` is null
      const interval = setInterval(() => {
        // if (!isLogin) {
          fetchData();
        // }
      }, 5000); // Adjust the interval as needed (currently 5 seconds)

      // Fetch immediately on mount
      fetchData();

      // Clear the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [fingerprint, isLogin]);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, [ready]);

  return (
    <>
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
        <SidebarProvider>
          <AppSidebar side={language === "ar" ? "right" : "left"} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="min-h-[90vh] flex-1 rounded-xl bg-muted/50">
              
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
}
