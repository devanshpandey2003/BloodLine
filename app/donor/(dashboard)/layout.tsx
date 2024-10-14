
import { Navigation } from "@/components/ui/Navigation"


const AdminPages = [

   {
      label: "Home",
      href: "/donor/profile"
   },

   {
      label: "Blood Camps",
      href: "/donor/registerCamps"
   },
   {
      label: "Registerd Camps",
      href: "/donor/registeredCamp"
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
