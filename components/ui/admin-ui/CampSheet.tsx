"use client"


import { 
Sheet,
 SheetContent,
 SheetHeader,
 SheetDescription,
 SheetTitle

 } from "@/components/ui/sheet"
import CampForm from "./CampInfo";   
import { UseNewSheet } from "@/store/hooks/useSetSheet"; 

export const BloodCampSheet = () => {
    const isOpen = UseNewSheet((state) => (state.isOpen));
    const onClose = UseNewSheet((state) => (state.onClose));
   

   
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Blood Camp Information</SheetTitle>
                    <SheetDescription>
                        Fill all details for the blood camp
                    </SheetDescription>
                </SheetHeader>
                <CampForm/>
            </SheetContent>
        </Sheet>
    );
};
