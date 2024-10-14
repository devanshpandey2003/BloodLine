"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useCreateDonor } from '@/store/hooks/useCreateDonor';

const DonorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    age: '',
    email: '',
    contact: '',
    address: '',
    disease: '',
    weight: '',
  });

  const { mutate: createDonor, isPending, isSuccess } = useCreateDonor();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Number(formData.age) < 18) {
      toast.error("Donor must be an adult");
      return;
    }

    createDonor({
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
    }, {
      onSuccess: () => {
        setFormData({
          name: '',
          bloodType: '',
          age: '',
          email: '',
          contact: '',
          address: '',
          disease: '',
          weight: '',
        });
        toast.success('Donor created successfully!');
      },
    });
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        placeholder="Name"
        required
      />

      <select
        className="my-3"
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
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <Input
        className="my-3"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <Input
        className="my-3"
        type="tel"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact"
        required
      />
      <Input
        className="my-3"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <Input
        className="my-3"
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Weight"
      />
      
      <Input
        className="my-3 "
        type="text"
        name="disease"
        value={formData.disease}
        onChange={handleChange}
        placeholder="Disease (if any)"
      />
      
      <Button className="mt-3" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>

      {isSuccess && <p className="text-green-500">Donor created successfully!</p>}
      {/* {isError && <p className="text-red-500">{error?.message || 'An error occurred'}</p>} */}
    </form>
  );
};

export default DonorForm;
