"use client";

import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const BloodRequestForm = () => {
  const [formData, setFormData] = useState({
    bloodType: '',
    quantity: '',
  });

  const [isPending, setIsPending] = useState(false);
 
  

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    

    if (Number(formData.quantity) <= 0) {
      toast.error("Quantity must be a positive number");
      setIsPending(false);
      return;
    }

    try {
       await axios.post("/api/requestBlood" , {
        bloodType: formData.bloodType,
        quantity: Number(formData.quantity),
      });

      setFormData({
        bloodType: '',
        quantity: '',
      });

      toast.success('Blood request generated successfully!');
     
    } catch (error) {
      console.error('Error creating blood request:', error);
      toast.error('Error creating blood request');
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        className="my-3 block w-full p-2 border border-gray-300 rounded"
        name="bloodType"
        value={formData.bloodType}
        onChange={handleChange}
        required
      >
        <option value="">Select Blood Type</option>
        {bloodTypes.map((bloodType) => (
          <option key={bloodType} value={bloodType}>
            {bloodType}
          </option>
        ))}
      </select>

      <Input
        className="my-3"
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />

      <Button className="mt-3" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>

      
      
    </form>
  );
};

export default BloodRequestForm;
