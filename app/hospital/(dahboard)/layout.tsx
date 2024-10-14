
import { Navigation } from "@/components/ui/Navigation"


const AdminPages = [

   {
      label: "Home",
      href: "/hospital/profile"
   },

   {
      label: "Blood Requests",
      href: "/hospital/getAllRequests"
   },
   {
      label: "Available Blood Stock",
      href: "/hospital/bloodInventory"
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
