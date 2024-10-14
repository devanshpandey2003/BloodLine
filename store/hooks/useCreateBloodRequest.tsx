import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import {  CreateCampSchemaType } from '@/zodValidation';
import { toast } from 'sonner';

export const useCreateCamp = (): UseMutationResult<any, unknown, CreateCampSchemaType> => {
    return useMutation({
        mutationFn: async (campInfo: CreateCampSchemaType) => {
            const response = await axios.post('/api/createCamp', campInfo);
            return response.data;
        },

        onSuccess: () => {
            toast.success("Blood Camp created successfully");
        },

        onError: (error: unknown) => {
            toast.error("Error creating Camp");
            if (error instanceof Error) {
                console.error("Mutation Error:", error.message);
            } else {
                console.error("Mutation Error:", error);
            }
        },
    });
};
