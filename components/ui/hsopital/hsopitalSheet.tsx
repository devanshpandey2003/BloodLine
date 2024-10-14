"use client"


import { 
Sheet,
 SheetContent,
 SheetHeader,
 SheetDescription,
 SheetTitle

 } from "@/components/ui/sheet"
 
import { UseNewSheet } from "@/store/hooks/useSetSheet"; 
import HospitalForm from "./hospitalInfoForm";

export const HospitalSheet = () => {
    const isHospitalSheetOpen = UseNewSheet((state) => (state.isHospitalSheetOpen));
    const onHospitalSheetClose = UseNewSheet((state) => (state.onHospitalSheetClose));
   

   
    return (
        <Sheet open={isHospitalSheetOpen} onOpenChange={onHospitalSheetClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Hospital Information </SheetTitle>
                    <SheetDescription>
                        Fill all your Information!
                    </SheetDescription>
                </SheetHeader>
                <HospitalForm/>
            </SheetContent>
        </Sheet>
    );
};
