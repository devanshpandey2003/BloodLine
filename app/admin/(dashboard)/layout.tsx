
import { Navigation } from "@/components/ui/Navigation"


const AdminPages = [

   {
      label: "Home",
      href: "/admin/home"
   },

   {
      label: "Profile",
      href: "/admin/profile"
   },
   {
      label: "Donor",
      href: "/admin/donor"
   },
   {
      label: "Blood Camps",
      href: "/admin/bloodCamps"
   },
   {
      label: "Hospital",
      href: "/admin/hospital"
   },
   {
      label: "Blood Requests",
      href: "/admin/bloodRequests"
   },
   {
      label: "Inventory",
      href: "/admin/bloodInventory"
   },

]
function layout({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <div className="flex felx-row">

         <Navigation pages={AdminPages} />

         {children}
      </div>
   )
}

export default layout
