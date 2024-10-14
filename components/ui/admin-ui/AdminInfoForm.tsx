"use client";

import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useCreateAdmin } from '@/store/hooks/useCreateAdmin';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const { mutate: createAdmin, isPending } = useCreateAdmin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email ) {
      toast.error('All fields are required');
      return;
    }

    createAdmin(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          email: '',
        });
        toast.success('Admin created successfully!');
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
        placeholder="Admin Name"
        required
      />

      <Input
        className="my-3"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        required
      />


      <Button className="mt-3" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>

    
    </form>
  );
};

export default AdminForm;
