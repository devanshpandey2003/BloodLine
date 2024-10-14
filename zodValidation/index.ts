import z from 'zod';


// model Donor {
//     donor_id     Int        @id @default(autoincrement())
//     name         String
//     bloodType    String
//     contact      String
//     address      String
//     disease      String
//     age          Int
//     weight       Int
//     email        String     @unique
//     lastDonation DateTime?
//     createdAt    DateTime   @default(now())
//     donations    Donation[]
//     user         User?
//   }

export const createDonorSchema = z.object({
    name: z.string(),
    bloodType: z.string(),
    contact: z.string(),
    address: z.string(),
    email: z.string().email(),
    disease: z.string(),
    age: z.number(),
    weight: z.number(),
   
});

export const updatedDonorSchema = z.object({
    name: z.string().optional(),
    contact: z.string().optional(),
    address: z.string().optional(),
    disease: z.string().optional(),
    weight: z.number().optional(),
    hasDonated: z.boolean().optional()
}); 


export const createHospitalSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    address: z.string().min(1, 'Address is required'),
    contact: z.string().min(1, 'Contact is required'),
});

export const updateHospitalSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    address: z.string().optional(),
    contact: z.string().optional(),
});

export const createAdminSchema = z.object({
    email: z.string().email('Invalid email'),
    name: z.string()
});

export const updateAdminSchema = z.object({
    email: z.string().email('Invalid email').optional(),
});

export const createCampSchema= z.object({
   name: z.string(),
   location: z.string(),
   date: z.date(),
});

export type CreateCampSchemaType = z.infer<typeof createCampSchema>

export type CreateDonorSchemaType = z.infer<typeof createDonorSchema>;
export type updateDonorSchemaType = z.infer<typeof updatedDonorSchema>

export type createHospitalSchemaType = z.infer<typeof createHospitalSchema>;
export type updateHospitalSchemaType = z.infer<typeof updateHospitalSchema>

export type createAdminSchemaType = z.infer<typeof createAdminSchema>;
export type updateAdminSchemaType = z.infer<typeof updateAdminSchema>