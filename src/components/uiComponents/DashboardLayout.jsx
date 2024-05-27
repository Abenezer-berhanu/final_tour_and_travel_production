"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHome, FaUser, FaSubway } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiSubway } from "react-icons/gi";
import { Button } from "../ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

function DashboardLayout() {
  const [viewList, setViewList] = useState(true);
  const pathname = usePathname();
  return (
    <div className="bg-main h-full bg-primary text-white flex flex-col p-3 w-full flex-grow">
      <h1 className="text-xl font-bold mx-auto">My Dashboard</h1>
      <div className="flex flex-col gap-1 items-center justify-center">
        <Avatar className="size-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="ring-2 ring-primary_orange bg-primary"></AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold">John Doe</h1>
        <p className="text-md">johndoe@gmail.com</p>
      </div>
      <span>
        <Button
          className="text-primary_orange p-0"
          onClick={() => setViewList(!viewList)}
        >
          {viewList && <ArrowBigDown />}
          {!viewList && <ArrowBigUp />}
        </Button>
      </span>
      {viewList && (
        <div
          className={`hidden sm:flex flex-col items-start justify-center gap-3 mt-2`}
        >
          <Link
            href={"/admin/dashboard"}
            className={`flex w-full items-center justify-center ${
              pathname == "/admin/dashboard"
                ? "bg-primary_orange"
                : "bg-white text-primary"
            } text-black rounded-md p-1 cursor-pointer hover:bg-primary_orange duration-200`}
          >
            <div className="flex gap-3 items-center py-5 min-w-[120px] max-h-[30px]">
              <FaHome size={25} className="" />
              <b className="">Home</b>
            </div>
          </Link>
          <Link
            href={"/admin/users"}
            className={`flex w-full items-center justify-center ${
              pathname == "/admin/users"
                ? "bg-primary_orange"
                : "bg-white text-primary"
            } text-black rounded-md p-1 cursor-pointer hover:bg-primary_orange duration-200`}
          >
            <div className="flex gap-3 items-center py-5 min-w-[120px] max-h-[30px]">
              <FaUser size={25} />
              <b>Users</b>
            </div>
          </Link>
          <Link
            href={"/admin/tours"}
            className={`flex w-full items-center justify-center ${
              pathname == "/admin/tours"
                ? "bg-primary_orange"
                : "bg-white text-primary"
            } text-black rounded-md p-1 cursor-pointer hover:bg-primary_orange duration-200`}
          >
            <div className="flex gap-3 items-center py-5 min-w-[120px] max-h-[30px]">
              <FaSubway size={25} />
              <b>Tours</b>
            </div>
          </Link>
          <Link
            href={"/admin/dashboard/newTour"}
            className={`flex w-full items-center justify-center ${
              pathname == "/admin/dashboard/newTour"
                ? "bg-primary_orange"
                : "bg-white text-primary"
            } text-black rounded-md p-1 cursor-pointer hover:bg-primary_orange duration-200`}
          >
            <div className="flex gap-3 items-center py-5 min-w-[120px] max-h-[30px]">
              <GiSubway size={25} />
              <b>New Tour</b>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
