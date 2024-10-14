import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import {  CreateDonorSchemaType } from '@/zodValidation';
import { toast } from 'sonner';

export const useRegisterBoodCamp = () => {
    return useMutation({
        mutationFn: async (campId: number) => {
            const response = await axios.post(`/api/registerCamps/${campId}`);
            return response.data;
        },

        onSuccess: () => {
            toast.success("Camp registered successfully");
        },

        onError: (error: unknown) => {
            toast.error("Error registering camp");
            if (error instanceof Error) {
                console.error("Mutation Error:", error.message);
            } else {
                console.error("Mutation Error:", error);
            }
        },
    });
};
