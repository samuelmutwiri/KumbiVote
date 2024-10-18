'use client';

import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ApiClient from '@utils/ApiClient';

export default function Dashboard({ isAuthenticated }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const apiClient = new ApiClient();

  const fetchUserDetails = async () => {
    try{
       response = await apiClient.get("/api/users/retrieve/");
       console.log(response.data);
       setUserDetails(response.data);
    } catch (error) {
      setError("An error occurred while fetching user details");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }


//  fetch("/api/token/", {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify({ username, password }),
//  })
//    .then((response) => response.json())
//    .then((data) => {
//      localStorage.setItem("token", data.access);
//      window.location.href = "/dashboard";
//    });
//

  const handleLogout = () => {
    authService.logout();
    router.push('/signin');
  };

  return (
    <div className="w-[80%] mx-auto flex justify-center items-center h-screen ">
       <div>
            <h1>User Profile</h1>
            {userDetails && (
                <div>
                    <p>Name: {userDetails.first_name} {userDetails.last_name}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
            )}
        </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Upcoming Elections
        </h1>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="/vote"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="#"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Other Elections
        </h1>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="#"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="#"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="#"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
        <a
          class="align-middle my-4 select-none flex justify-between font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full"
          href="#"
        >
          <p>Up state election:</p>
          <p>02-11-2024</p>
        </a>
      </div>
    </div>
  );
};

