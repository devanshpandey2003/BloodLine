import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const proectedRoutes = createRouteMatcher([
    '/donor(.*)',
    '/hospital(.*)',
    '/admin(.*)',
])
const publicRoutes = createRouteMatcher(["/"]);


export default clerkMiddleware((auth, req) => {
//  if(proectedRoutes(req)) {
//     auth().protect();
//  }
 
 const userId = auth().userId;
//  if(!userId && publicRoutes(req)) {
//   return NextResponse.redirect(new URL('/', req.url))
//  }

 if(!userId && proectedRoutes(req)) {
    return NextResponse.redirect(new URL(`/sign-in`, req.url));
 }
 return NextResponse.next();

});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};