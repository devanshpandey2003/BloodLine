"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { UserButton } from '@clerk/nextjs';


const Login = () => {
  const [userType, setUserType] = useState('');
  const router = useRouter();

  const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
   const value = e.target.value;
   setUserType(value);
  };

  function handleLogin () {
     localStorage.setItem("currentUser", userType);
     router.push("./sign-in")
  }

  return (
    <div className="flex items-center justify-center h--[50vh]">
    <div className="bg-slate-200 w-96 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Login as</h2>
      <div className="checkbox-group mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            value="donor"
            checked={userType.includes('donor')}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Donor
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="hospital"
            checked={userType.includes('hospital')}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Hospital
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="admin"
            checked={userType.includes('admin')}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Admin
        </label>
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Login
      </button>
      <UserButton  afterSignOutUrl='/'/>
    </div>
  </div>
  );
};

export default Login;
