"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function EmployeesPage() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/data?page=${page}&pageSize=${pageSize}`
        );
        const result = await response.json();

        if (response.ok) {
          setData(result.result);
          setTotal(result.total);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp._id}>
                <td className="border-b px-4 py-2">{emp._id}</td>
                <td className="border-b px-4 py-2">{emp.firstName}</td>
                <td className="border-b px-4 py-2">{emp.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2  rounded disabled:opacity-50"
        >
          Previous
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </Button>
      </div>

      <div className="mt-4">
        <label>
          Page Size:{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
