"use client"


import { 
Sheet,
 SheetContent,
 SheetHeader,
 SheetDescription,
 SheetTitle

 } from "@/components/ui/sheet"
import DonorForm from "./donorInfoForm";  
import { UseNewSheet } from "@/store/hooks/useSetSheet"; 

export const DonorSheet = () => {
    const isDonorSheetOpen = UseNewSheet((state) => (state.isDonorSheetOpen));
    const onDonorSheetClose = UseNewSheet((state) => (state.onDonorSheetClose));
   

   
    return (
        <Sheet open={isDonorSheetOpen} onOpenChange={onDonorSheetClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Donor Information </SheetTitle>
                    <SheetDescription>
                        Fill all your Information to start donating!
                    </SheetDescription>
                </SheetHeader>
                <DonorForm/>
            </SheetContent>
        </Sheet>
    );
};
