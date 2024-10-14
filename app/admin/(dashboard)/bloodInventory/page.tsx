"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from "next/image";

import { toast } from 'sonner';

interface BloodInventoryItem {
  bloodType: string;
  _sum: {
    quantity: number;
  };
}

const BloodImage = [
  { label: "A+", image: "/A+.png" },
  { label: "A-", image: "/A-.png" },
  { label: "O+", image: "/O+.png" },
  { label: "O-", image: "/O-.png" },
  { label: "AB+", image: "/AB+.png" },
  { label: "AB-", image: "/AB-.png" },
  { label: "B+", image: "/B+.png" },
  { label: "B-", image: "/B-.png" },
];

function Page() {
  const [inventory, setInventory] = useState<BloodInventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Handle which form to show
  // const [donorId, setDonorId] = useState<string>(""); 
  const [quantity, setQuantity] = useState<number | "">("");

  const isAdmin = localStorage.getItem("currentUser");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("/api/bloodInventory");
        setInventory(res.data.bloodInventory);
        setLoading(false);
      } catch (error) {
        setError("Error fetching blood inventory");
        setLoading(false);
        console.log(error)
      }
    };

    fetchInventory();
  }, []);

  const handleScheduleClick = (label: string) => {
    setSelectedImage(label); // Show form for selected blood type
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      await axios.post('/api/updateInventory', {
        quantity,
        bloodType: selectedImage,
      });

      // Reset form after submission
      // setDonorId("");
      setQuantity("");
      setSelectedImage(null);
      toast.success("Information Updated")
      window.location.reload();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (loading)
    return (
      <div className='h-screen w-full justify-center items-center flex'>
        <p>Loading inventory...</p>
      </div>
    );

  if (error) return <p>{error}</p>;

  // Helper function to get the quantity for a blood type from the inventory
  const getBloodStock = (bloodType: string) => {
    const bloodData = inventory.find((item) => item.bloodType === bloodType);
    return bloodData ? bloodData._sum.quantity : 0; // Default to 0 if not found
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {BloodImage.map((img) => (
        <div
          key={img.image}
          className="bg-gray-50 flex-col transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 duration-300 ease-in-out shadow-xl p-4"
        >
          <div className="grid grid-cols-2">
            <Image className='col-span-1' src={img.image} alt={img.label} height={100} width={100} />
            <div className='col-span-1 flex-col'>
              <h2 className='font-semibold'>
                Total Stock for {img.label}
              </h2>
              <p className="text-xl font-bold">
                {getBloodStock(img.label)} units
              </p>
            </div>
          </div>
          {isAdmin === "admin" && (<Button className='mt-4' onClick={() => handleScheduleClick(img.label)}>
            Update {img.label}
          </Button>

          )}

          {selectedImage === img.label && (
            <form className='mt-4' onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 p-2"
                />
                <Button type="submit" className="mt-2" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default Page;
