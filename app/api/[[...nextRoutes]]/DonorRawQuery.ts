// import { Hono } from 'hono';
// import { zValidator } from '@hono/zod-validator';
// import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
// import { Pool } from 'pg';
// import { createDonorSchema, updatedDonorSchema } from '@/zodValidation';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const donorRouter = new Hono();

// donorRouter.post('/createDonor',
//   clerkMiddleware(),
//   zValidator('json', createDonorSchema),
//   async (c) => {
//     const values = await c.req.valid('json');
//     const auth = getAuth(c);
//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }
//     if (values.age < 18) {
//       return c.json({ message: 'Donor must be an adult' }, 400);
//     }
//     try {
//       const query = `
//         INSERT INTO "Donor" (name, bloodType, age, email, contact, weight, address, disease, createdAt)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
//         RETURNING *;
//       `;
//       const result = await pool.query(query, [
//         values.name, values.bloodType, values.age, values.email, values.contact, values.weight, values.address, values.disease
//       ]);
//       return c.json({ message: 'Donor created successfully', newDonor: result.rows[0] }, 201);
//     } catch (error) {
//       console.error('Error creating donor:', error);
//       return c.json({ error: 'Error creating donor' }, 500);
//     }
//   }
// );

// donorRouter.post('/updateDonor/:id',
//   zValidator('json', updatedDonorSchema),
//   async (c) => {
//     const donorId = c.req.param('id');
//     const values = await c.req.valid('json');
//     try {
//       const findQuery = `SELECT * FROM "Donor" WHERE donor_id = $1;`;
//       const findResult = await pool.query(findQuery, [parseInt(donorId)]);
//       if (findResult.rowCount === 0) {
//         return c.json({ message: 'Donor not found' }, 404);
//       }
//       const updateQuery = `
//         UPDATE "Donor"
//         SET name = $1, contact = $2, updatedAt = NOW()
//         WHERE donor_id = $3
//         RETURNING *;
//       `;
//       const result = await pool.query(updateQuery, [values.name, values.contact, parseInt(donorId)]);
//       return c.json({ message: 'Donor updated successfully', updatedDonor: result.rows[0] });
//     } catch (error) {
//       console.error('Error updating donor:', error);
//       return c.json({ error: 'Error updating donor' }, 500);
//     }
//   }
// );

// donorRouter.post('/deleteDonor/:id', async (c) => {
//   const donorId = c.req.param('id');
//   try {
//     const findQuery = `SELECT * FROM "Donor" WHERE donor_id = $1;`;
//     const findResult = await pool.query(findQuery, [parseInt(donorId)]);
//     if (findResult.rowCount === 0) {
//       return c.json({ message: 'Donor not found' }, 404);
//     }
//     const deleteQuery = `DELETE FROM "Donor" WHERE donor_id = $1;`;
//     await pool.query(deleteQuery, [parseInt(donorId)]);
//     return c.json({ message: 'Donor deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting donor:', error);
//     return c.json({ error: 'Error deleting donor' }, 500);
//   }
// });

// donorRouter.get('/donor/donations/:id', async (c) => {
//   const donorId = c.req.param('id');
//   try {
//     const query = `
//       SELECT id, bloodType, date, quantity 
//       FROM "Donation" 
//       WHERE donorId = $1;
//     `;
//     const result = await pool.query(query, [parseInt(donorId)]);
//     if (result.rowCount === 0) {
//       return c.json({ message: 'You have not donated till date' }, 404);
//     }
//     return c.json({ donations: result.rows });
//   } catch (error) {
//     console.error('Error fetching donations:', error);
//     return c.json({ error: 'Error fetching donations' }, 500);
//   }
// });

// donorRouter.post('/donate/:id', async (c) => {
//   const donorId = c.req.param('id');
//   const donorQuery = `
//     SELECT donor_id, bloodType 
//     FROM "Donor" 
//     WHERE donor_id = $1;
//   `;
//   const donorResult = await pool.query(donorQuery, [parseInt(donorId)]);
//   if (donorResult.rowCount === 0) {
//     return c.json({ message: 'Donor not found' }, 404);
//   }
//   const donor = donorResult.rows[0];
//   try {
//     const inventoryQuery = `
//       INSERT INTO "BloodInventory" (bloodType, quantity) 
//       VALUES ($1, 2);
//     `;
//     await pool.query(inventoryQuery, [donor.bloodType]);
//     const donationQuery = `
//       INSERT INTO "Donation" (donorId, bloodType, quantity, date) 
//       VALUES ($1, $2, 2, NOW())
//       RETURNING *;
//     `;
//     const donationResult = await pool.query(donationQuery, [parseInt(donorId), donor.bloodType]);
//     return c.json(donationResult.rows[0]);
//   } catch (error) {
//     console.error('Error creating donation:', error);
//     return c.json({ error: 'Error creating donation' }, 500);
//   }
// });

// donorRouter.post('/registerCamps/:campId', clerkMiddleware(), async (c) => {
//   const campId = parseInt(c.req.param('campId'), 10);
//   const auth = getAuth(c);
//   if (!auth?.userId) {
//     return c.json({ error: 'Unauthorized' }, 401);
//   }
//   try {
//     const donorQuery = `SELECT donor_id FROM "Donor" WHERE user_id = $1;`;
//     const donorResult = await pool.query(donorQuery, [auth.userId]);
//     if (donorResult.rowCount === 0) {
//       return c.json({ error: 'Donor not found' }, 404);
//     }
//     const registrationQuery = `
//       INSERT INTO "CampRegistration" (donorId, campId) 
//       VALUES ($1, $2) 
//       RETURNING *;
//     `;
//     const registrationResult = await pool.query(registrationQuery, [donorResult.rows[0].donor_id, campId]);
//     return c.json({ message: 'Registered successfully', registration: registrationResult.rows[0] }, 201);
//   } catch (error) {
//     console.error('Error registering for camp:', error);
//     return c.json({ error: 'Error registering for camp' }, 500);
//   }
// });

// donorRouter.get('/getAllCamps', async (c) => {
//   try {
//     const query = `
//       SELECT * 
//       FROM "DonationCamp" 
//       WHERE date >= NOW() 
//       ORDER BY date ASC;
//     `;
//     const result = await pool.query(query);
//     return c.json({ camps: result.rows });
//   } catch (error) {
//     console.error('Error fetching camps:', error);
//     return c.json({ error: 'Error fetching camps' }, 500);
//   }
// });

// export default donorRouter;
