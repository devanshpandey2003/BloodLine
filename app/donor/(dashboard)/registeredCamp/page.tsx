"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Camp {
  name: string;
  location: string;
  date: string;
}

interface CampResponse {
  camp: Camp;
}

function Page() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const res = await axios.get("/api/getRegisteredCamp");
        const campsData = res.data.camps.map((item: CampResponse) => item.camp);
        setCamps(campsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching camps");
        setLoading(false);
        console.log(error);
      }
    };

    fetchCamps();
  }, []);

  if (loading) return (
    <div className='h-screen w-full justify-center items-center flex'>
      <p>Loading camps...</p>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {camps.map((camp, index) => (
        <div
          key={index}
          className="bg-gray-50 flex flex-col justify-center items-center shadow-xl p-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 duration-300 ease-in-out"
        >
          <h1 className='font-bold mb-2'>{camp.name}</h1>
          <h2 className='flex gap-1'>
            <span className='font-semibold'>Location:</span> {camp.location}
          </h2>
          <h2 className='flex gap-1 mt-2'>
            <span className='font-semibold'>Date:</span> {new Date(camp.date).toLocaleDateString()}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Page;
