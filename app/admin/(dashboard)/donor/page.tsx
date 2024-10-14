"use client";

import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { UseNewSheet } from "@/store/hooks/useSetSheet";
import { toast } from "sonner";


interface Donor {
  donor_id: number; 
  name: string;
  bloodType: string;
  address: string;
  disease: string;
  email: string
 
};


const Donors = () => {
  const onDonorSheetOpen = UseNewSheet((state) =>state.onDonorSheetOpen);

  const [donors, setDonors] = useState<Donor[]>([]);

  const columns = [
    { field: "donor_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field : "email", headerName: "Email", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "bloodType", headerName: "Blood Type", width: 130 },
    { field: "diseases", headerName: "Disease", width: 150 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params: { row: { donor_id: number; }; }) => {
        return (
          <FaTrash
            className="text-red-500 cursor-pointer m-2"
            onClick={() => handleDelete(params.row.donor_id)}
          />
        );
      },
    },
  ];

  // Fetch donors from the API
  useEffect(() => {
    const getDonors = async () => {
      try {
        const { data } = await axios.get('/api/allDonors');
        
        setDonors(data.donors)
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
      setDonors(donors.filter((donor) => donor.donor_id !== id));
      toast.success("Donor Deleted Successfully")
    } catch (error) {
      console.error("Error deleting donor", error);
    }
  };

  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px] font-semibold">All Donors</h1>
         <Button onClick={onDonorSheetOpen  }>
          New Donor
         </Button>
      </div>
      <div className="m-[30px]">
        <DataGrid
          rows={donors}
          getRowId={(row) => row.donor_id}
          checkboxSelection
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Donors;
