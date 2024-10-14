"use client"
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {  createHospitalSchemaType } from '@/zodValidation';
import { toast } from 'sonner';

export const useCreateHospital = (): UseMutationResult<any, unknown, createHospitalSchemaType> => {
    return useMutation({
        mutationFn: async (hospitalInfo: createHospitalSchemaType) => {
            try {
               

                const response = await axios.post('/api/createHospital', hospitalInfo);
                return response.data;
            } catch (error) {
               
                if (axios.isAxiosError(error)) {
                  
                    throw new AxiosError(error.message, error.code, error.request, error.response);
                }
                throw error;
            }
        },

        onSuccess: () => {
            toast.success("Hospital  created successfully");
        },

        onError: (error: unknown) => {
            toast.error("Error creating Hopital");
            if (error instanceof Error) {
                console.error("Mutation Error:", error.message);
            } else {
                console.error("Mutation Error:", error);
            }
        },
    });
};
