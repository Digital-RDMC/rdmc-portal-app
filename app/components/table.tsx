/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Emps({api}: {api: string}) {
  const [empsData, setEmpsData] = useState<any>([]);
  const [empsKeys, setEmpsKeys] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const { result } = await response.json();
        const keys = Object.keys(result[0]);
        setEmpsKeys(keys);
        console.log("result", result.length);
        setEmpsData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData(); // Call the async function
  },[api]); // Empty dependency array to run only once on component mount

  return (
    <div>
      {empsData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              {empsKeys.map((key: string, i: number) => (
                <TableHead key={i}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {empsData.map((item: any, index: number) => (
              <TableRow key={index}>
                {empsKeys.map((key: string, i: number) => (
                  <TableCell key={i}>{item[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid grid-rows-1 items-center align-middle justify-items-center min-h-screen ">Loading...</div>
      )}
    </div>
  );
}
