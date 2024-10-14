import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import {  CreateDonorSchemaType } from '@/zodValidation';
import { toast } from 'sonner';

export const useCreateDonor = (): UseMutationResult<any, unknown, CreateDonorSchemaType> => {
    return useMutation({
        mutationFn: async (donorInfo: CreateDonorSchemaType) => {
            const response = await axios.post('/api/createDonor', donorInfo);
            return response.data;
        },

        onSuccess: () => {
            toast.success("Donor created successfully");
        },

        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
                // Check for the specific error message returned by the backend for duplicate email
                const errorMessage = error.response?.data?.message;
                if (errorMessage === 'UserId or Email already exists') {
                    toast.error('An account with this userId or email already exists. Please use a different email.');
                } else {
                    toast.error("Error creating Donor");
                }

                // Log the error response if available
                console.error("Axios Error:", error.response?.data || error.message);
            } 
        },
    });
};
