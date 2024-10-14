

//zustand is a state management library that allows you to create state containers.
// The create function is used to define a store (a state container) with specific state and actions.

import { create } from "zustand";

type NewAccountState = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
   isDonorSheetOpen: boolean;
   onDonorSheetOpen: () => void;
   onDonorSheetClose: () => void;
   isHospitalSheetOpen: boolean;
   onHospitalSheetOpen: () => void;
   onHospitalSheetClose: () => void;
   isRequestSheetOpen: boolean;
   onRequestSheetOpen: () => void;
   onRequestSheetClose: () => void;
   isAdminSheetOpen : boolean;
   onAdminSheetOpen: () => void;
   onAdminSheetClose: () => void;

};

export const UseNewSheet = create<NewAccountState>((set) => ({

   isOpen : false,
   onOpen: () => set({ isOpen :true }),
   onClose: () => set({ isOpen: false }),
   
   isDonorSheetOpen : false,
   onDonorSheetOpen: () => set({ isDonorSheetOpen :true }),
   onDonorSheetClose: () => set({ isDonorSheetOpen: false }),
   
   isRequestSheetOpen : false,
   onRequestSheetOpen: () => set({ isRequestSheetOpen :true }),
   onRequestSheetClose: () => set({ isRequestSheetOpen: false }),
   
   isHospitalSheetOpen : false,
   onHospitalSheetOpen: () => set({ isHospitalSheetOpen :true }),
   onHospitalSheetClose: () => set({ isHospitalSheetOpen: false }),
   
   isAdminSheetOpen : false,
   onAdminSheetOpen: () => set({isAdminSheetOpen: true}),
   onAdminSheetClose: () => set({isAdminSheetOpen: false})

}));


