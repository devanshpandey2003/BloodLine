"use client";

import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useCreateCamp } from '@/store/hooks/useCreateCamps';  // Custom hook to create a camp

const CampForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
  });

  const { mutate: createCamp, isPending, isSuccess } = useCreateCamp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.date) {
      toast.error('All fields are required');
      return;
    }

    createCamp({
      ...formData,
      date: new Date(formData.date),  // Ensure date is in the correct format
    }, {
      onSuccess: () => {
        setFormData({
          name: '',
          location: '',
          date: '',
        });
        toast.success('Blood Camp created successfully!');
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
        placeholder="Camp Name"
        required
      />

      <Input
        className="my-3"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />

      <Input
        className="my-3"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        required
      />

      <Button className="mt-3" type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Blood Camp'}
      </Button>

      {isSuccess && <p className="text-green-500">Camp created successfully!</p>}
      {/* {isError && <p className="text-red-500">{error?.message || 'An error occurred'}</p>} */}
    </form>
  );
};

export default CampForm;
