"use client";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const router = useRouter();
  const logout = () => {
    deleteCookie("jwt");
    router.push("/login");
  };
  return (
    <div className='w-full h-20 px-10 flex items-center justify-between bg-neutral-200'>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <Button variant={"destructive"} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
