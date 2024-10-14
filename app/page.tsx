"use client";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/hero"
import Features from "@/components/ui/features";
import Login from "@/components/ui/login";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Footer from "@/components/ui/Footer";
import { Element } from "react-scroll";



export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const userType = localStorage.getItem("currentUser");
     
    if (isSignedIn) {
      if (userType === 'donor') {
        router.push('/donor/profile');
      } else if (userType === 'hospital') {
        router.push('/hospital/profile');
      } else if (userType === 'admin') {
        router.push('/admin/donor');
      }
    }
  }, [isSignedIn, router]);

  return (

   <>
   <Navbar />
   <Element name="hero" > 
   <Hero />
   </Element>
   <Element name="featured" >
   <Features />
   </Element>
   <Element name="login" >
   <Login />
   </Element>
   <Element name="contact" >
   <Footer />
   </Element>
   </>
   
  );
}
