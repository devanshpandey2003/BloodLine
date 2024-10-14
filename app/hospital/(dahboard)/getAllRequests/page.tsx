"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";




interface Hospital {
  id: number;
  name: string;
  hospitalId: string;
  bloodType: string;
  quantity: string;
};


const BloodRquests = () => {
  


  const [bloodRequests, setBloodRequests] = useState<Hospital[]>([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "bloodType", headerName: "Blood Group", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "requestDate", headerName: "Request Date", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  useEffect(() => {
    const getbloodRequest = async () => {
      try {
        const res = await axios.get('/api/bloodRequest');
        setBloodRequests(res.data.bloodRequests)
      } catch (error) {
        console.error("Error fetching donors", error);
      }
    };
    getbloodRequest();
  }, []);



  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px] font-semibold">All Requests</h1>
      </div>
      <div className="m-[30px]">
        <DataGrid
          rows={bloodRequests}
          getRowId={(row) => row.id}
          checkboxSelection
          columns={columns}
        />
      </div>
    </div>
  );
};

export default BloodRquests;
