"use client"


import { 
Sheet,
 SheetContent,
 SheetHeader,
 SheetDescription,
 SheetTitle

 } from "@/components/ui/sheet"   
import { UseNewSheet } from "@/store/hooks/useSetSheet"; 
import AdminForm from "./AdminInfoForm";

export const AdminSheet = () => {
    const isAdminSheetOpen = UseNewSheet((state) => (state.isAdminSheetOpen));
    const onAdminSheetClose = UseNewSheet((state) => (state.onAdminSheetClose));
   

   
    return (
        <Sheet open={isAdminSheetOpen} onOpenChange={onAdminSheetClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Admin Information</SheetTitle>
                    <SheetDescription>
                        Fill all details! 
                    </SheetDescription>
                </SheetHeader>
                <AdminForm/>
            </SheetContent>
        </Sheet>
    );
};
