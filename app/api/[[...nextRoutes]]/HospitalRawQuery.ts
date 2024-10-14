// import { Hono } from 'hono';
// import { zValidator } from '@hono/zod-validator';
// import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
// import { Pool } from 'pg';
// import { createHospitalSchema, updateHospitalSchema } from '@/zodValidation';

// // PostgreSQL connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const hospitalRouter = new Hono();

// // Create Hospital
// hospitalRouter.post('/createHospital',
//   clerkMiddleware(),
//   zValidator('json', createHospitalSchema),
//   async (c) => {
//     const values = await c.req.valid('json');
//     const auth = getAuth(c);
//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }
//     try {
//       const query = `
//         INSERT INTO "Hospital" (name, email, address, contact, userId, createdAt)
//         VALUES ($1, $2, $3, $4, $5, NOW()) 
//         RETURNING *;
//       `;
//       const result = await pool.query(query, [values.name, values.email, values.address, values.contact, auth.userId]);
//       return c.json({ message: 'Hospital created successfully', newHospital: result.rows[0] }, 201);
//     } catch (error) {
//       console.error('Error creating hospital:', error);
//       return c.json({ error: 'Error creating hospital' }, 500);
//     }
//   }
// );

// // Update Hospital
// hospitalRouter.post('/updateHospital/:id',
//   zValidator('json', updateHospitalSchema),
//   async (c) => {
//     const hospitalId = c.req.param('id');
//     const values = await c.req.valid('json');
//     try {
//       const findQuery = `
//         SELECT * FROM "Hospital" WHERE id = $1;
//       `;
//       const findResult = await pool.query(findQuery, [parseInt(hospitalId)]);
//       if (findResult.rowCount === 0) {
//         return c.json({ message: 'Hospital not found' }, 404);
//       }

//       const updateQuery = `
//         UPDATE "Hospital"
//         SET name = $1, contact = $2, updatedAt = NOW()
//         WHERE id = $3
//         RETURNING *;
//       `;
//       const result = await pool.query(updateQuery, [values.name, values.contact, parseInt(hospitalId)]);
//       return c.json({ message: 'Hospital updated successfully', updatedHospital: result.rows[0] });
//     } catch (error) {
//       console.error('Error updating hospital:', error);
//       return c.json({ error: 'Error updating hospital' }, 500);
//     }
//   }
// );

// // Delete Hospital
// hospitalRouter.post('/deleteHospital/:id', async (c) => {
//   const hospitalId = c.req.param('id');
//   try {
//     const findQuery = `
//       SELECT * FROM "Hospital" WHERE id = $1;
//     `;
//     const findResult = await pool.query(findQuery, [parseInt(hospitalId)]);
//     if (findResult.rowCount === 0) {
//       return c.json({ message: 'Hospital not found' }, 404);
//     }

//     const deleteQuery = `
//       DELETE FROM "Hospital" WHERE id = $1;
//     `;
//     await pool.query(deleteQuery, [parseInt(hospitalId)]);
//     return c.json({ message: 'Hospital deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting hospital:', error);
//     return c.json({ error: 'Error deleting hospital' }, 500);
//   }
// });

// // Request Blood
// hospitalRouter.post('/requestBlood', clerkMiddleware(), async (c) => {
//   const { bloodType, quantity } = await c.req.json();
//   const auth = getAuth(c);
//   if (!auth?.userId) {
//     return c.json({ error: 'Unauthorized' }, 401);
//   }
//   try {
//     const hospitalQuery = `
//       SELECT id FROM "Hospital" WHERE userId = $1;
//     `;
//     const hospitalResult = await pool.query(hospitalQuery, [auth.userId]);
//     if (hospitalResult.rowCount === 0) {
//       return c.json({ error: 'Hospital not found' }, 404);
//     }
//     const hospitalId = hospitalResult.rows[0].id;

//     const bloodRequestQuery = `
//       INSERT INTO "BloodRequest" (hospitalId, bloodType, quantity, status, requestDate)
//       VALUES ($1, $2, $3, $4, NOW())
//       RETURNING *;
//     `;
//     const bloodRequestResult = await pool.query(bloodRequestQuery, [hospitalId, bloodType, quantity, 'PENDING']);
//     return c.json({ message: 'Blood request created successfully', bloodRequest: bloodRequestResult.rows[0] }, 201);
//   } catch (error) {
//     console.error('Error creating blood request:', error);
//     return c.json({ error: 'Error creating blood request' }, 500);
//   }
// });

// // Get Blood Requests
// hospitalRouter.get('/bloodRequest/:id', clerkMiddleware(), async (c) => {
//   const hospitalId = c.req.param('id');
//   try {
//     const hospitalQuery = `
//       SELECT * FROM "Hospital" WHERE id = $1;
//     `;
//     const hospitalResult = await pool.query(hospitalQuery, [Number(hospitalId)]);
//     if (hospitalResult.rowCount === 0) {
//       return c.json({ error: 'Hospital not found' }, 404);
//     }

//     const bloodRequestsQuery = `
//       SELECT id, bloodType, quantity, status, hospitalId, requestDate
//       FROM "BloodRequest"
//       WHERE hospitalId = $1
//       ORDER BY requestDate DESC;
//     `;
//     const bloodRequestsResult = await pool.query(bloodRequestsQuery, [hospitalResult.rows[0].id]);
//     return c.json({ bloodRequests: bloodRequestsResult.rows });
//   } catch (error) {
//     console.error('Error fetching blood requests:', error);
//     return c.json({ error: 'Error fetching blood requests' }, 500);
//   }
// });

// export default hospitalRouter;
