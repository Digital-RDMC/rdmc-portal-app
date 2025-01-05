/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // shadcn Button component
import * as ExcelJS from "exceljs";

// Utility function to convert a string to camelCase
const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

export default function ExcelUploader() {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [dataRows, setDataRows] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setIsProcessing(true);

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      // Get the first worksheet
      const worksheet = workbook.worksheets[0];

      // Parse rows into objects
      const rows: any[] = [];
      let headers: string[] = [];

      worksheet.eachRow((row, rowIndex) => {
        const values = Array.isArray(row.values) ? row.values.slice(1) : []; // Exclude row index
        if (rowIndex === 1) {
          // First row is treated as headers and converted to camelCase
          headers = values.map((header) =>
            typeof header === "string" ? toCamelCase(header) : ""
          );
        } else {
          // Map headers to row values
          const rowObject: { [key: string]: any } = {};
          headers.forEach((header, i) => {
            rowObject[header] = values[i]?.toString();
          });
          rowObject["_id"] = rowObject.employeeCode
          rows.push(rowObject);
        }
      });

    //   setDataRows(rows);
    //   console.log("Parsed Excel Data:", rows);

      // Optional: Send data to the API
      await fetch("/api/emps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rows),
      });
    } catch (error) {
      console.error("Error reading Excel file:", error);
    } finally {
    //   setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] space-y-4">
      <h1 className="text-2xl font-bold">Upload Excel File</h1>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="border rounded px-3 py-2"
      />
      {/* <Button disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Upload"}
      </Button> */}

    </div>
  );
}
