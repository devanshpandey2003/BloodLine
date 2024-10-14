import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import donorRouter from './donor'
import hospitalRouter from './hospital'
import adminRouter from './admin'

const app = new Hono().basePath('/api')

// Chaining the routes directly
app.route("/", donorRouter)
   .route("/", hospitalRouter)
   .route("/", adminRouter);

export const GET = handle(app)
export const POST = handle(app)

// Optional: Define the AppType if necessary
export type AppType = typeof app;
