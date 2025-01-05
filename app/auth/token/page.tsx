/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";

// Utility function to fetch fingerprint
const fetchFingerprint = async (): Promise<string> => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error("Error fetching fingerprint:", error);
    return '';
  }
};





// Check if user exists in the database
const checkUser = async (finger: string): Promise<any> => {
  try {
    const response = await fetch(`/api/emplog?fingerPrint=${finger}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const { result } = await response.json();
    return result || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

const addEmpLog = async (data: Record<string, any>): Promise<boolean> => {
  try {
    const response = await fetch("/api/emplog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (err) {
    console.error("Error adding employee log:", err);
    return false;
  }
};


export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [tokenData, settokenData] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [status, setStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settokenData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    setStatus("Checking database...");
    const finger: string = await fetchFingerprint();
    const emp = await checkUser(finger);


    if (emp) {
      setStatus(JSON.stringify(emp))
      if(emp.token === tokenData){
        setStatus("Token matches")

        const isWithin30Minutes = (timestamp: string): boolean => {
          const currentTime = new Date().getTime(); // Current time in milliseconds
          const dataTime = new Date(timestamp).getTime(); // Convert timestamp to milliseconds
          const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
          return currentTime < dataTime + thirtyMinutes;
        };

        if (!isWithin30Minutes(emp.timestamp)) {
          setStatus("You need to refresh you session, please login again.")
        } else {
          emp.verified = true
          emp.timestamp = new Date().toISOString()
          const empLogUpdate = await addEmpLog(emp);
          if (empLogUpdate) {
            setStatus("Authenticated successfully! Redirecting...");
            setTimeout(() => router.push("/user"), 3000); 
          }
        }
      }
    }
  
  };

  return (
    <div className="my-24">
      <div className="w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="token">{t("auth.token")}</Label>
            <Input
              id="token"
              value={tokenData}
              onChange={handleInputChange}
              disabled={isDisabled}
              placeholder="****"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">
                <ChevronLeft />
                {t("auth.Back")}
              </Link>
            </Button>
            <Button type="submit" disabled={isDisabled}>
              {isDisabled ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span>{t("auth.PleaseWait")}</span>
                </div>
              ) : (
                <>
                  {t("auth.Login")} <ChevronRight />
                </>
              )}
            </Button>
          </div>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </div>
  );
}
