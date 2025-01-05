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

// Add employee log to the database
const addEmpLog = async (data: Record<string, any>): Promise<boolean> => {
  try {
    data.verified = false
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

// Send email with a token
const sendEmail = async (to: string, token: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/sendemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, token }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error sending email:", errorData);
    }
    return response.ok;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Generate a secure token
const generateEasyToken = (): string => {
  const patterns = [
    () => `${Math.random().toFixed(4).slice(2)}`, // Random 4 digits
    () => `${Math.floor(Math.random() * 9000) + 1000}`, // Random between 1000-9999
    () => Array(4).fill(`${Math.floor(Math.random() * 10)}`).join(""), // Repeated digit
    () => {
      const d1 = Math.floor(Math.random() * 10);
      const d2 = Math.floor(Math.random() * 10);
      return `${d1}${d2}${d2}${d1}`;
    }, // Mirrored pattern
  ];
  return patterns[Math.floor(Math.random() * patterns.length)]();
};

// Check if user exists in the database
const checkUser = async (email: string): Promise<any> => {
  try {
    const response = await fetch(`/api/emp?email=${email}`, {
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

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [emailData, setEmailData] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [status, setStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    setStatus("Checking database...");

    const emp = await checkUser(emailData);
    if (!emp) {
      setStatus("Employee not found in database.");
      setIsDisabled(false);
      return;
    }

    setStatus("Employee found. Generating fingerprint...");
    const finger = await fetchFingerprint();
    if (!finger) {
      setStatus("Failed to retrieve fingerprint.");
      setIsDisabled(false);
      return;
    }

    const token = generateEasyToken();
    const empLogData = {
      fingerPrint: finger,
      _id: emp.employeeCode,
      email: emailData,
      timestamp: new Date().toISOString(),
      token,
    };

    setStatus("Logging employee activity...");
    const empLogUpdate = await addEmpLog(empLogData);
    if (!empLogUpdate) {
      setStatus("Failed to log employee activity.");
      setIsDisabled(false);
      return;
    }

    setStatus("Sending email...");
    const emailSent = await sendEmail(emailData, token);
    if (emailSent) {
      setStatus("Email sent successfully! Redirecting...");
      setTimeout(() => router.push("/auth/token"), 3000);
    } else {
      setStatus("Failed to send email. Please try again.");
      setIsDisabled(false);
    }
  };

  return (
    <div className="my-24">
      <div className="w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              value={emailData}
              onChange={handleInputChange}
              disabled={isDisabled}
              placeholder="m@ratpdev.com"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button className="w-[100%]" variant="outline" asChild>
              <Link href="/auth/login">
                <ChevronLeft />
                {t("auth.Back")}
              </Link>
            </Button>
            <Button className="w-[100%]"  type="submit" disabled={isDisabled}>
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
