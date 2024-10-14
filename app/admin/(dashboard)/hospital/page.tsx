"use client";

import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { UseNewSheet } from "@/store/hooks/useSetSheet";
import { toast } from "sonner";




interface Hospital {
  id: number; 
  name: string;
  email: string;
  address: string;
 contact: string; 
};


const Donors = () => {
  const onDonorSheetOpen = UseNewSheet((state) =>state.onDonorSheetOpen);

  const [hospital, setHospital] = useState<Hospital[]>([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field : "email", headerName: "Email", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "contact", headerName: "Contact", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      
      renderCell: (params: { row: { id: number; }; }) => {
        return (
          <FaTrash
            className="text-red-500 cursor-pointer m-2"
            onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  // Fetch donors from the API
  useEffect(() => {
    const getDonors = async () => {
      try {
        const { data } = await axios.get('/api/allHospitals');
        
        setHospital(data.hospitals)
      } catch (error) {
        console.error("Error fetching donors", error);
      }
    };
    getDonors();
  }, []);

  // Handle donor deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.post(`/api/deleteDonor/${id}`);
      setHospital(hospital.filter((hospital) => hospital.id !== id));
      toast.success("Hospital Deleted Successfully")
    } catch (error) {
      console.error("Error deleting donor", error);
    }
  };

  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px] font-semibold">All Hospitals</h1>
         <Button onClick={onDonorSheetOpen  }>
         Add New Hospital
         </Button>
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

export default Donors;
