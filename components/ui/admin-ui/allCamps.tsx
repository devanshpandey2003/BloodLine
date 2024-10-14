"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { toast } from 'sonner';
import { useRegisterBoodCamp } from '@/store/hooks/useResterBloodCamp';

interface CampProps {
    name: string;
    location: string;
    date: string;
    id: number;
};

const AllCamps = () => {
    const { mutate: registerCamps} = useRegisterBoodCamp();

    const [camps, setCamps] = useState<CampProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function handleDonor(campId: number) {
        try {
            registerCamps(campId, 

        {
                onSuccess : () => {
                    toast.success("You are ready to donate");
                },

            });
            
        } catch (e) {
            toast.error("You have not updated your profile");
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const res = await axios.get("/api/getAllCamps");
                setCamps(res.data.camps);
                
                setLoading(false);
            } catch (error) {
                setError("Error fetching camps");
                setLoading(false);
                console.log(error);
            }
        };

        fetchCamps();
    }, []);

    if (loading) return <p>Loading camps...</p>;
    if (error) return <p>{error}</p>;

    const isDonor = localStorage.getItem("currentUser");

    const renderCamps = () => (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {camps.map((camp) => (
                <div key={camp.id} className="bg-gray-50 flex-col transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 duration-300 ease-in-out  shadow-xl p-4">
                    <h1 className='font-bold mb-2'>{camp.name}</h1>
                    <h2 className='flex gap-1'>
                        <span className='font-semibold'>Location:</span> {camp.location}
                    </h2>
                    <h2 className='flex gap-1 mt-2'>
                        <span className='font-semibold'>Date:</span> {new Date(camp.date).toLocaleDateString()}
                    </h2>
                    
                    {isDonor === "donor" && (
                        <Button className='mt-4' onClick={() => handleDonor(camp.id)} >
                         Schedule Appointment
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col items-center px-4 py-8">
            {renderCamps()}
        </div>
    );
};

export default AllCamps;
