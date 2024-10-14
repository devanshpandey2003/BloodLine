import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { PrismaClient } from '@prisma/client';
import { createDonorSchema, updatedDonorSchema } from '@/zodValidation';
import { clerkClient } from '@clerk/nextjs/server';



const prisma = new PrismaClient();


const date = new Date();


const donorRouter = new Hono()
    .post('/createDonor',
        clerkMiddleware(),
        zValidator('json', createDonorSchema),
        async (c) => {
            const values = await c.req.valid('json');

            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Unauthroised" }, 401)
            };

            const user = await clerkClient.users.getUser(auth.userId);

            if (!user.primaryEmailAddress?.emailAddress) {
              throw new Error('User does not have a primary email address');
            }

            if (values.age < 18) {
                return c.json({ message: ' Donor must be an adult' }, 400);
            }
            try {

                const userDonor = await prisma.user.create({
                    data:{
                        id: user.primaryEmailAddress.emailAddress,
                        role: "DONOR",
                        
                    }
                })
                const newDonor = await prisma.donor.create({
                    data: {
                        name: values.name,
                        bloodType: values.bloodType,
                        age: values.age,
                        email: values.email,
                        contact: values.contact,
                        weight: values.weight,
                        address: values.address,
                        disease: values.disease,
                        user: {
                            connect: {
                                id: user.primaryEmailAddress.emailAddress
                            }
                        }
                       
                    }
                });
               
                    
               
                
                return c.json({ message: 'Donor created successfully', newDonor, userDonor}, 201);
            } catch (error) {
                console.error('Error creating donor:', error);

                return c.json({ message: 'Error creating donor' }, 500);
            }
        })
    .post('/updateDonor/:id', zValidator('json', updatedDonorSchema), async (c) => {
        const donorId = c.req.param('id');
        const values = await c.req.valid('json');

        try {
            const findDonor = await prisma.donor.findFirst({
                where: {
                    donor_id: parseInt(donorId)
                }
            })

            if (!findDonor) {
                return c.json({ message: 'Donor not found' }, 404);
            }

            const updatedDonor = await prisma.donor.update({
                where: { donor_id: parseInt(donorId) },
                data: {
                    name: values.name,
                    contact: values.contact,
                },
            });

            return c.json({ message: 'Donor updated successfully', updatedDonor });
        } catch (error) {
            console.error('Error updating donor:', error);
            return c.json({ error: 'Error updating donor' }, 500);
        }
    })
    .post('/deleteDonor/:id', async (c) => {
        const donorId = c.req.param('id');

        try {
            const findDonor = await prisma.donor.findFirst({
                where: {
                    donor_id: parseInt(donorId)
                }
            })

            if (!findDonor) {
                return c.json({ message: 'Donor not found' }, 404);
            }

            await prisma.donor.delete({
                where: {
                    donor_id: parseInt(donorId)
                }
            });


            return c.json({ message: 'Donor deleted successfully' });
        } catch (error) {
            console.error('Error deleting donor:', error);
            return c.json({ error: 'Error deleting donor' }, 500);
        }
    })
    .get('/donor/donations/:id', async (c) => {
        const donorId = c.req.param('id');

        try {
            const donations = await prisma.donation.findMany({
                where: { donorId: parseInt(donorId) },
                select: {
                    id: true,
                    bloodType: true,
                    date: true,
                    quantity: true,
                },
            });

            if (!donations.length) {
                return c.json({ message: 'You have not donated till date' }, 404);
            }

            return c.json({ donations });
        } catch (error) {
            console.error('Error fetching donations:', error);
            return c.json({ error: 'Error fetching donations' }, 500);
        }
    })

    .post('/donate/:id', async (c) => {
        const donorId = c.req.param('id');

        const donor = await prisma.donor.findFirst({
            where: { donor_id: parseInt(donorId) },
            select: {
                donor_id: true,
                bloodType: true,

            }
        })

        if (!donor) {
            return c.json({ message: 'Donor not found' }, 404);
        }
        try {

            await prisma.bloodInventory.create({
                data: {
                    bloodType: donor.bloodType,
                    quantity: 2.

                }
            });

            const donation = await prisma.donation.create({
                data: {
                    donorId: parseInt(donorId),
                    bloodType: donor.bloodType,
                    quantity: 2,
                    date: date
                }, select: {
                    id: true,
                    bloodType: true,
                    quantity: true,
                    donor: {
                        select: {
                            name: true
                        }
                    }
                }
            })



            return c.json(donation);
        } catch (e) {
            console.error('Error creating donation:', e);
        }

    })

    .post('/registerCamps/:campId', clerkMiddleware(), async (c) => {
        const campId = parseInt(c.req.param('campId'), 10);
        
        const auth = getAuth(c);

        if (!auth?.userId) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const user = await clerkClient.users.getUser(auth.userId);

        if (!user.primaryEmailAddress?.emailAddress) {
          throw new Error('User does not have a primary email address');
        }
        try {
            const donor = await prisma.donor.findFirst({
                where: { 
                   user: {id: user.primaryEmailAddress.emailAddress} 
                  },
                });

            if (!donor) {
                return c.json({ error: 'Donor not found' }, 404);
            }

            const registration = await prisma.campRegistration.create({
                data: {
                    donorId: donor.donor_id,
                    campId: campId,
                },
            });

            return c.json({ message: 'Registered successfully', registration }, 201);
        } catch (error) {
            console.error('Error registering for camp:', error);
            return c.json({ error: 'Error registering for camp' }, 500);
        }
    })

    .get('/getAllCamps', async (c) => {
        try {
            const camps = await prisma.donationCamp.findMany({
                where: {
                    date: { gte: new Date() }, 
                },
                orderBy: { date: 'asc' },
            });

            return c.json({ camps });
        } catch (error) {
            console.error('Error fetching camps:', error);
            return c.json({ error: 'Error fetching camps' }, 500);
        }
    })
    .get('/getRegisteredCamp', 
        clerkMiddleware(),
         async(c)=> {
        const auth = getAuth(c);
      

            if (!auth?.userId) {
                return c.json({ error: 'Unauthorized' }, 401);
            };

        try{
            const donor = await prisma.donor.findFirst({
                where: {
                    user: {
                        id: auth.userId
                    }
                }
            });
            const  camps  = await prisma.campRegistration.findMany({
                where: {
                    donorId: donor?.donor_id
                },
                select:{
                    camp: {
                        select: {
                            name: true,
                            location: true,
                            date: true
                        }
                    },
                },
                orderBy: { camp: {
                        date: 'asc'
                } },
            });
            return c.json({camps});
        }catch (error) {
            console.error('Error fetching registered camps:', error);
            return c.json({ error: 'Error fetching registered camps' }, 500);
        }
    } )



export default donorRouter;
