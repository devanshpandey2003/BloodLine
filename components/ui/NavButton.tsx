import Link from 'next/link'
import React from 'react'
import { Button } from './button'

interface Props {
    href: string,
    label: string,
    selected?: boolean,
}

function NavButton( {href, label, selected} : Props) {
  return (
   
            <Button className={ ` btn btn-sm border border-none bg-red-500  ml-[15px]  hover:bg-red-200 hover:text-red-700 border-none" , ${selected ? "bg-white/10 text-red-500" : "transparent" }`}>
                <Link href= {href}>
                {label}
                </Link>

            </Button>
    
  )
}

export default NavButton

