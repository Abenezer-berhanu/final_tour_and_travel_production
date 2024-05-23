import DashboardLayout from "@/components/uiComponents/DashboardLayout";
import React from "react";

function layout({ children }) {
  return (
    <div className="min-h-[680px] w-full mx-auto grid grid-cols-11 gap-5 border">
      <div className="col-span-2 border ">
        <DashboardLayout />
      </div>
      <div className="col-span-9 border">{children}</div>
    </div>
  );
}

export default layout;
