import { PrismaClient } from "@prisma/client"



const prisma  = new PrismaClient();

export const getAllDonors = async ({id} : {id: number}) => {
  try{
    const hospital  = await prisma.hospital.findUnique({
      where:{
        id:id
      },
      select: {
        id: true,
      }
    })
    return hospital;
  } catch(e) {
    console.error("Error fetching donor")

  }
};