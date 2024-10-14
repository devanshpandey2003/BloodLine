import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { createAdminSchema, updateAdminSchema } from '@/zodValidation';
import { clerkClient } from '@clerk/nextjs/server';


const prisma = new PrismaClient();

const adminRouter = new Hono()
    .post('/createAdmin',
         clerkMiddleware(),
        zValidator('json', createAdminSchema),
        async (c) => {
            const values = await c.req.valid('json');
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }
            const user = await clerkClient.users.getUser(auth.userId);

            if (!user.primaryEmailAddress?.emailAddress) {
              throw new Error('User does not have a primary email address');
            }
            try {
                const userAdmin = await prisma.user.create({
                    data: {
                        role: "ADMIN",
                        id: user.primaryEmailAddress.emailAddress
                    }
                }) 
                const newAdmin = await prisma.admin.create({
                    data: {
                       name: values.name,
                        email: values.email,
                        user: {connect : {id : user.primaryEmailAddress.emailAddress}}
                    }
                });
             
                return c.json({ message: 'Admin created successfully', newAdmin, userAdmin  }, 201);
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    
                    if (error.code === 'P2002') {
                        return c.json({ message: 'UserId or Email already exists' }, 400);
                    }
                }
            
                console.error('Error creating admin:', error);
                return c.json({ error: 'Error creating admin' }, 500);
            }
        })
    .post('/updateAdmin/:id',
        zValidator('json', updateAdminSchema),
        async (c) => {
            const adminId = c.req.param('id');
            const values = await c.req.valid('json');

            try {
                const findAdmin = await prisma.admin.findUnique({
                    where: { id: parseInt(adminId) },
                });

                if (!findAdmin) {
                    return c.json({ message: 'Admin not found' }, 404);
                }

                const updatedAdmin = await prisma.admin.update({
                    where: { id: parseInt(adminId) },
                    data: {
                        email: values.email,
                    },
                });

                return c.json({ message: 'Admin updated successfully', updatedAdmin });
            } catch (error) {
                console.error('Error updating admin:', error);
                return c.json({ error: 'Error updating admin' }, 500);
            }
        })
    .post('/deleteAdmin/:id', async (c) => {
        const adminId = c.req.param('id');

        try {
            const findAdmin = await prisma.admin.findUnique({
                where: { id: parseInt(adminId) },
            });

            if (!findAdmin) {
                return c.json({ message: 'Admin not found' }, 404);
            }

            await prisma.admin.delete({
                where: { id: parseInt(adminId) },
            });

            return c.json({ message: 'Admin deleted successfully' });
        } catch (error) {
            console.error('Error deleting admin:', error);
            return c.json({ error: 'Error deleting admin' }, 500);
        }
    })
    .get('/allAdmins', async (c) => {
        try {
            const admins = await prisma.admin.findMany({
                select: {
                    id: true,
                    email: true,
                },
                orderBy: { createdAt: 'desc' },
            });

            return c.json({ admins });
        } catch (error) {
            console.error('Error fetching admins:', error);
            return c.json({ error: 'Error fetching admins' }, 500);
        }
    })




    //hospital routes
    .get('/allHospitals', async (c) => {
        try {
            const hospitals = await prisma.hospital.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    contact: true,
                },
            });

            return c.json({ hospitals });
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            return c.json({ error: 'Error fetching hospitals' }, 500);
        }
    })

    .get('/allBloodRequests', 
        clerkMiddleware(),
         async (c) => {
        const auth = getAuth(c);
      
        if (!auth?.userId) {
          return c.json({ error: 'Unauthorized' }, 401);
        }
      
        try {
          const allBloodRequests = await prisma.bloodRequest.findMany({
            select: {
                id:true,
                hospitalId:true,
                bloodType:true,
                quantity:true,
                status:true
            }
          });
      
          return c.json({ allBloodRequests });
        } catch (error) {
          console.error('Error fetching blood requests:', error);
          return c.json({ error: 'Error fetching blood requests' }, 500);
        }
      })
    .post('/approveRequest/:id', async (c) => {
        const requestId = parseInt(c.req.param('id'));
        const body = await c.req.json();
        const { action } = body;
    
        if (!['accept', 'reject'].includes(action)) {
            return c.json({ error: 'Invalid action. Use "accept" or "reject".' }, 400);
        }
    
        try {
            const bloodRequest = await prisma.bloodRequest.findUnique({
                where: { id: requestId },
            });
    
            if (!bloodRequest) {
                return c.json({ error: 'Blood request not found.' }, 404);
            }
    
           
            const newStatus = action === 'accept' ? 'APPROVED' : 'REJECTED';
    
            const updatedRequest = await prisma.bloodRequest.update({
                where: { id: requestId },
                data: { status: newStatus },
            });
            
            if(newStatus === 'APPROVED') {
                 await prisma.bloodInventory.update({
                    where:{
                        bloodType: bloodRequest.bloodType
                    },
                    data: {
                        quantity: {
                           decrement: bloodRequest.quantity
                        }
                       },
                })
            }
    
            return c.json({ message: `Blood request ${newStatus.toLowerCase()} successfully.`, updatedRequest});
        } catch (error) {
            console.error('Error updating blood request:', error);
            return c.json({ error: 'Error processing the blood request.' }, 500);
        }
    })
      


    //donor routes
    .get('/allDonors', async (c) => {
        try {
            const donors = await prisma.donor.findMany({
                where:{
                    hasDonated: false
                },
                select: {
                    donor_id: true,
                    name: true,
                    bloodType: true,
                    contact: true,
                    disease: true,
                    address: true,
                   email: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return c.json({ donors });
        } catch (error) {
            console.error('Error fetching donors:', error);
            return c.json({ error: 'Error fetching donors' }, 500);
        }
    })


    //BloodCamp 
    .post('/createCamp',
        clerkMiddleware(),
         async (c) => {
        const { name, location, date } = await c.req.json();
        const auth = getAuth(c); 

        if (!auth?.userId) {
            return c.json({ error: 'Unauthorized' }, 401);
          }
          
      
       
        try {
         
          const camp = await prisma.donationCamp.create({
            data: {
              name,
              location,
              date: new Date(date),
            },
          });
      
          return c.json({ message: 'Camp created successfully', camp }, 201);
        } catch (error) {
          console.error('Error creating camp:', error);
          return c.json({ error: 'Error creating camp' }, 500);
        }
      })
      .get('/bloodInventory', async (c) => {
        try {
          const bloodInventory = await prisma.bloodInventory.groupBy({
            by: ['bloodType'],
            _sum: {
              quantity: true,
            },
            orderBy: { bloodType: 'asc' },
          });
      
          return c.json({ bloodInventory });
        } catch (error) {
          console.error('Error fetching blood inventory:', error);
          return c.json({ error: 'Error fetching blood inventory' }, 500);
        }
      })
      .post('/updateInventory', 
        clerkMiddleware(),
        async (c) => {
        const { bloodType, quantity } = await c.req.json();
        const auth = getAuth(c); 

        if (!auth?.userId) {
            return c.json({ error: 'Unauthorized' }, 401);
          }

      
       
        try {
          const updateInventory = await prisma.bloodInventory.update({
            where: {
                bloodType: bloodType,
            },
            data: {
             quantity: {
                increment: quantity
             }
            },
          });
      
          return c.json({ message: 'Camp created successfully', updateInventory }, 201);
        } catch (error) {
          console.error('Error creating camp:', error);
          return c.json({ error: 'Error creating camp' }, 500);
        }
      })
      

export default adminRouter;
