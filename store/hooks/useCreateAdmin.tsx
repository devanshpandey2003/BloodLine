import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { createAdminSchemaType } from '@/zodValidation';
import { toast } from 'sonner';

export const useCreateAdmin = (): UseMutationResult<any, unknown, createAdminSchemaType> => {
    return useMutation({
        mutationFn: async (AdminInfo: createAdminSchemaType) => {
            try {
               

                const response = await axios.post('/api/createAdmin', AdminInfo);
                return response.data;
            } catch (error) {
               
                if (axios.isAxiosError(error)) {
                  
                    throw new AxiosError(error.message, error.code, error.request, error.response);
                }
                throw error;
            }
        },

        onSuccess: () => {
            toast.success("Admin created successfully");
        },

        onError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
                // Check for the specific error message returned by the backend for duplicate email
                const errorMessage = error.response?.data?.message;
                if (errorMessage === 'UserId or Email already exists') {
                    toast.error('An account with this userId or email already exists. Please use a different email.');
                } else {
                    toast.error("Error creating Admin");
                }

                // Log the error response if available
                console.error("Axios Error:", error.response?.data || error.message);
            } 
        },
    });
};
