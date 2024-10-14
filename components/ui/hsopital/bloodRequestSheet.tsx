"use client"


import { 
Sheet,
 SheetContent,
 SheetHeader,
 SheetDescription,
 SheetTitle

 } from "@/components/ui/sheet"
  
import { UseNewSheet } from "@/store/hooks/useSetSheet"; 
import BloodRequestForm from "./bloodRequestForm";

export const BloodRequestSheet = () => {
    const isRequestSheetOpen = UseNewSheet((state) => (state.isRequestSheetOpen));
    const onRequestSheetClose = UseNewSheet((state) => (state.onRequestSheetClose));
   

   
    return (
        <Sheet open={isRequestSheetOpen} onOpenChange={onRequestSheetClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Request Information </SheetTitle>
                    <SheetDescription>
                        Fill all the Information to generate request.
                    </SheetDescription>
                </SheetHeader>
                <BloodRequestForm  />
            </SheetContent>
        </Sheet>
    );
};
