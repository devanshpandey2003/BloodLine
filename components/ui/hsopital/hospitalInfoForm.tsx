"use client";

import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useCreateHospital } from '@/store/hooks/useCreateHospital';


const HospitalForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
  });

  const { mutate: createHospital, isPending, isSuccess, } = useCreateHospital();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    createHospital(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          email: '',
          address: '',
          contact: '',
        });
        toast.success('Hospital created successfully!');
        
      },
    });
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className="my-3"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Hospital Name"
        required
      />

      <Input
        className="my-3"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Hospital Email"
        required
      />

      <Input
        className="my-3"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <Input
        className="my-3"
        type="tel"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact Number"
        required
      />

      <Button className="mt-3" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>

      {isSuccess && <p className="text-green-500">Hospital created successfully!</p>}
      {/* {isError && <p className="text-red-500">{error?.message || 'An error occurred'}</p>} */}
    </form>
  );
};

export default HospitalForm;
