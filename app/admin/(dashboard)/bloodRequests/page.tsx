"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface Hospital {
  id: number;
  name: string;
  hospitalId: string;
  bloodType: string;
  quantity: string;
};


const BloodRquests = () => {

  const [hospital, setHospital] = useState<Hospital[]>([]);
 
    const handleAction = async (action: string , requestId: number) => {
      try {
           await axios.post(`/api/approveRequest/${requestId}`, {
              action,
          });
          if(action === "accept") {
            toast.success("Request Approved")
          }else {
            toast.success("Request Rejected");
          }
          window.location.reload();
      } catch (err) {
          console.error(err);
         
      } 
  };

  


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "hospitalId", headerName: "Hospital Id", width: 150 },
    { field: "bloodType", headerName: "Blood Group", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "Approve",
      headerName: "Approve",
      width: 150,
      renderCell: (params: { row: { id: number; }; }) => {
        return (
          <>
              <Button onClick={() => {handleAction( "accept" ,  params.row.id )}}
              >Approve</Button>
          </>
        );
      },
    },
    
      {
        field: "Reject",
        headerName: "Reject",
        width: 150,
        renderCell: (params: { row: { id: number; }; }) => {
          return (
            <>
                <Button onClick={() => {handleAction( "reject" ,  params.row.id)}}  className="bg-red-500"
                >Reject</Button>
            </>
          );
        },
      },
  ];

  useEffect(() => {
    const getbloodRequest = async () => {
      try {
        const res = await axios.get("/api/allBloodRequests");
        setHospital(res.data.allBloodRequests)
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
          rows={hospital}
          getRowId={(row) => row.id}
          checkboxSelection
          columns={columns}
        />
      </div>
    </div>
  );
};

export default BloodRquests;
