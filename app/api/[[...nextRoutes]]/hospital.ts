import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { PrismaClient } from '@prisma/client';
import { createHospitalSchema, updateHospitalSchema } from '@/zodValidation'; 
import { clerkClient } from '@clerk/nextjs/server';






const prisma = new PrismaClient();

const hospitalRouter = new Hono()
    .post('/createHospital',
        clerkMiddleware(),
         zValidator('json', createHospitalSchema),
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
              const userHospital = await prisma.user.create({
                data: {
                  id: user.primaryEmailAddress.emailAddress, 
                  role: "HOSPITAL"
                }
              });
              
                const newHospital = await prisma.hospital.create({
                    data: {
                        name: values.name,
                        email: values.email,
                        address: values.address,
                        contact: values.contact,
                        user: { connect: { id: user.primaryEmailAddress.emailAddress } }, 
                    }
                });
                return c.json({ message: 'Hospital created successfully', newHospital, userHospital }, 201);
            } catch (error) {
                console.error('Error creating hospital:', error);
                return c.json({ error: 'Error creating hospital' }, 500);
            }
        })
    .post('/updateHospital/:id',
        zValidator('json', updateHospitalSchema),
        async (c) => {
            const hospitalId = c.req.param('id');
            const values = await c.req.valid('json');

            try {
                const findHospital = await prisma.hospital.findUnique({
                    where: { id: parseInt(hospitalId) },
                });

                if (!findHospital) {
                    return c.json({ message: 'Hospital not found' }, 404);
                }

                const updatedHospital = await prisma.hospital.update({
                    where: { id: parseInt(hospitalId) },
                    data: {
                        name: values.name,
                        contact: values.contact,
                    },
                });

                return c.json({ message: 'Hospital updated successfully', updatedHospital });
            } catch (error) {
                console.error('Error updating hospital:', error);
                return c.json({ error: 'Error updating hospital' }, 500);
            }
        })
    .post('/deleteHospital/:id', async (c) => {
        const hospitalId = c.req.param('id');

        try {
            const findHospital = await prisma.hospital.findUnique({
                where: { id: parseInt(hospitalId) },
            });

            if (!findHospital) {
                return c.json({ message: 'Hospital not found' }, 404);
            }

            await prisma.hospital.delete({
                where: { id: parseInt(hospitalId) },
            });

            return c.json({ message: 'Hospital deleted successfully' });
        } catch (error) {
            console.error('Error deleting hospital:', error);
            return c.json({ error: 'Error deleting hospital' }, 500);
        }
    })

         .post('/requestBlood', clerkMiddleware(), async (c) => {
        const { bloodType, quantity } = await c.req.json();
        const auth = getAuth(c);
    

        if (!auth?.userId) {
          return c.json({ error: 'Unauthorized' }, 401);
        }
        const user = await clerkClient.users.getUser(auth.userId);

        if (!user.primaryEmailAddress?.emailAddress) {
          throw new Error('User does not have a primary email address');
        }
        try {

          const hospital = await prisma.hospital.findFirst({
            where: { 
               user: {id: user.primaryEmailAddress.emailAddress} 
              },
          });
      
          if (!hospital) {
            return c.json({ error: 'Hospital not found' }, 404);
          }
      
          const bloodRequest = await prisma.bloodRequest.create({
            data: {
              hospitalId: hospital.id,
              bloodType,
              quantity,
              status: 'PENDING',
            },
          });
      
          return c.json({ message: 'Blood request created successfully', bloodRequest }, 201);
        } catch (error) {
          console.error('Error creating blood request:', error);
          return c.json({ error: 'Error creating blood request' }, 500);
        }
      })

     .get('/bloodRequest', 
      clerkMiddleware(),
       async (c) => {
        
        const auth = getAuth(c);
     
      
        if (!auth?.userId) {
          return c.json({ error: 'Unauthorized' }, 401);
        }

        const user = await clerkClient.users.getUser(auth.userId);

            if (!user.primaryEmailAddress?.emailAddress) {
              throw new Error('User does not have a primary email address');
            }

        try {
          const hospital = await prisma.hospital.findFirst({
            where: {user : { id: user.primaryEmailAddress.emailAddress } },
          });
      
          if (!hospital) {
            return c.json({ error: 'Hospital not found' }, 404);
          }
      
          const bloodRequests = await prisma.bloodRequest.findMany({
            where: { hospitalId: hospital.id },
            orderBy: { requestDate: 'desc' },
            select:{
              id: true,
              bloodType: true,
              quantity: true,
              status: true,
              hospitalId:true,
              requestDate:true,
              hospital: {
               select: {
                name:true
               }
              }
            }
          });
      
          return c.json({ bloodRequests });
        } catch (error) {
          console.error('Error fetching blood requests:', error);
          return c.json({ error: 'Error fetching blood requests' }, 500);
        }
      });
      
      
   

export default hospitalRouter;
