"use client";

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [workData, setWorkData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkData() {
      try {
        const response = await fetch('/api/work');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWorkData(data.data); // Assuming your response structure is { data: [...] }
      } catch (error) {
        console.error("Error fetching work data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Work Experience Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Employment Type</th>
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
            </tr>
          </thead>
          <tbody>
            {workData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.title}</td>
                <td className="py-2 px-4 border-b">{item.employeType}</td>
                <td className="py-2 px-4 border-b">{item.companyName}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">{item.startDate}</td>
                <td className="py-2 px-4 border-b">{item.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
