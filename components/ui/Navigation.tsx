"use client";

import NavButton from "./NavButton";
import { usePathname } from "next/navigation";

interface Page {
  href: string;
  label: string;
}

interface Props {
  pages: Page[];
}

export const Navigation = ({ pages }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center  my-4 mx-4 items-center w-[20%] bg-gray-100 h-screen ">
     <div className="flex flex-col gap-6  ">
     {pages.map((p) => (
        <NavButton key={p.href} label={p.label} href={p.href} selected={pathname === p.href} />
      ))}
     </div>
    </div>
  );
};
