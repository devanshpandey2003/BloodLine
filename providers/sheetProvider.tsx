import { AdminSheet } from '@/components/ui/admin-ui/AdminSheet'
import { BloodCampSheet } from '@/components/ui/admin-ui/CampSheet'
import { DonorSheet } from '@/components/ui/DonorSheet'
import { BloodRequestSheet } from '@/components/ui/hsopital/bloodRequestSheet'
import { HospitalSheet } from '@/components/ui/hsopital/hsopitalSheet'
import React from 'react'

function SheetProviders() {
  return (
    
      
    <>
    <DonorSheet />
    <BloodCampSheet/>
    <HospitalSheet/>
    <BloodRequestSheet/>
    <AdminSheet/>
    </>
  )
}

export default SheetProviders
