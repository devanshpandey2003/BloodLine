// import { Hono } from 'hono';
// import { zValidator } from '@hono/zod-validator';
// import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
// import { Pool } from 'pg';
// import { createAdminSchema, updateAdminSchema } from '@/zodValidation';

// // PostgreSQL connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const adminRouter = new Hono();

// // Create Admin
// adminRouter.post('/createAdmin',
//   clerkMiddleware(),
//   zValidator('json', createAdminSchema),
//   async (c) => {
//     const values = await c.req.valid('json'); 
//     const auth = getAuth(c);
//     if (!auth?.userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }
//     try {
//       const query = `
//         INSERT INTO "Admin" (password, email, userId, createdAt)
//         VALUES ($1, $2, $3, NOW()) 
//         RETURNING *;
//       `;
//       const result = await pool.query(query, [values.password, values.email, auth.userId]);
//       return c.json({ message: 'Admin created successfully', newAdmin: result.rows[0] }, 201);
//     } catch (error) {
//       console.error('Error creating admin:', error);
//       return c.json({ error: 'Error creating admin' }, 500);
//     }
//   });

// // Update Admin
// adminRouter.post('/updateAdmin/:id',
//   zValidator('json', updateAdminSchema),
//   async (c) => {
//     const adminId = c.req.param('id');
//     const values = await c.req.valid('json');
//     try {
//       const findQuery = `
//         SELECT * FROM "Admin" WHERE id = $1;
//       `;
//       const findResult = await pool.query(findQuery, [parseInt(adminId)]);
//       if (findResult.rowCount === 0) {
//         return c.json({ message: 'Admin not found' }, 404);
//       }

//       const updateQuery = `
//         UPDATE "Admin"
//         SET email = $1, updatedAt = NOW()
//         WHERE id = $2
//         RETURNING *;
//       `;
//       const result = await pool.query(updateQuery, [values.email, parseInt(adminId)]);
//       return c.json({ message: 'Admin updated successfully', updatedAdmin: result.rows[0] });
//     } catch (error) {
//       console.error('Error updating admin:', error);
//       return c.json({ error: 'Error updating admin' }, 500);
//     }
//   });

// // Delete Admin
// adminRouter.post('/deleteAdmin/:id', async (c) => {
//   const adminId = c.req.param('id');
//   try {
//     const findQuery = `
//       SELECT * FROM "Admin" WHERE id = $1;
//     `;
//     const findResult = await pool.query(findQuery, [parseInt(adminId)]);
//     if (findResult.rowCount === 0) {
//       return c.json({ message: 'Admin not found' }, 404);
//     }

//     const deleteQuery = `
//       DELETE FROM "Admin" WHERE id = $1;
//     `;
//     await pool.query(deleteQuery, [parseInt(adminId)]);
//     return c.json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting admin:', error);
//     return c.json({ error: 'Error deleting admin' }, 500);
//   }
// });

// // Get All Admins
// adminRouter.get('/allAdmins', async (c) => {
//   try {
//     const query = `
//       SELECT id, email FROM "Admin" ORDER BY createdAt DESC;
//     `;
//     const result = await pool.query(query);
//     return c.json({ admins: result.rows });
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     return c.json({ error: 'Error fetching admins' }, 500);
//   }
// });

// // Get All Hospitals
// adminRouter.get('/allHospitals', async (c) => {
//   try {
//     const query = `
//       SELECT id, name, email, address, contact FROM "Hospital";
//     `;
//     const result = await pool.query(query);
//     return c.json({ hospitals: result.rows });
//   } catch (error) {
//     console.error('Error fetching hospitals:', error);
//     return c.json({ error: 'Error fetching hospitals' }, 500);
//   }
// });

// // Get All Blood Requests
// adminRouter.get('/allBloodRequests', clerkMiddleware(), async (c) => {
//   const auth = getAuth(c);
//   // if (!auth?.userId) {
//   //   return c.json({ error: 'Unauthorized' }, 401);
//   // }
//   try {
//     const query = `
//       SELECT id, hospitalId, bloodType, quantity, status
//       FROM "BloodRequest";
//     `;
//     const result = await pool.query(query);
//     return c.json({ allBloodRequests: result.rows });
//   } catch (error) {
//     console.error('Error fetching blood requests:', error);
//     return c.json({ error: 'Error fetching blood requests' }, 500);
//   }
// });

// // Approve or Reject Blood Request
// adminRouter.post('/approveRequest/:id', async (c) => {
//   const requestId = parseInt(c.req.param('id'));
//   const body = await c.req.json();
//   const { action } = body;

//   if (!['accept', 'reject'].includes(action)) {
//     return c.json({ error: 'Invalid action. Use "accept" or "reject".' }, 400);
//   }

//   try {
//     const findQuery = `
//       SELECT * FROM "BloodRequest" WHERE id = $1;
//     `;
//     const findResult = await pool.query(findQuery, [requestId]);

//     if (findResult.rowCount === 0) {
//       return c.json({ error: 'Blood request not found.' }, 404);
//     }

//     const newStatus = action === 'accept' ? 'APPROVED' : 'REJECTED';

//     const updateQuery = `
//       UPDATE "BloodRequest"
//       SET status = $1
//       WHERE id = $2
//       RETURNING *;
//     `;
//     const result = await pool.query(updateQuery, [newStatus, requestId]);

//     return c.json({ message: `Blood request ${newStatus.toLowerCase()} successfully.`, updatedRequest: result.rows[0] });
//   } catch (error) {
//     console.error('Error processing the blood request:', error);
//     return c.json({ error: 'Error processing the blood request' }, 500);
//   }
// });

// // Get All Donors (without donations)
// adminRouter.get('/allDonors', async (c) => {
//   try {
//     const query = `
//       SELECT donor_id, name, bloodType, contact, disease, address, email
//       FROM "Donor"
//       WHERE hasDonated = false
//       ORDER BY createdAt DESC;
//     `;
//     const result = await pool.query(query);
//     return c.json({ donors: result.rows });
//   } catch (error) {
//     console.error('Error fetching donors:', error);
//     return c.json({ error: 'Error fetching donors' }, 500);
//   }
// });

// // Create Donation Camp
// adminRouter.post('/createCamp', async (c) => {
//   const { name, location, date } = await c.req.json();
//   const auth = getAuth(c);

//   try {
//     const query = `
//       INSERT INTO "DonationCamp" (name, location, date, createdAt)
//       VALUES ($1, $2, $3, NOW())
//       RETURNING *;
//     `;
//     const result = await pool.query(query, [name, location, new Date(date)]);
//     return c.json({ message: 'Camp created successfully', camp: result.rows[0] }, 201);
//   } catch (error) {
//     console.error('Error creating camp:', error);
//     return c.json({ error: 'Error creating camp' }, 500);
//   }
// });

// export default adminRouter;
