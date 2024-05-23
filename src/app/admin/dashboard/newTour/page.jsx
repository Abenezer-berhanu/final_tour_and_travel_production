import AdminTourForm from "@/components/uiComponents/AdminTourForm";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full pl-5 py-4 flex flex-col bg-slate-100">
        <b className="text-xl">Create a Tour</b>
        <p className="text-sm text-slate-600">
          please fill all required fields.
        </p>
      </div>
      <div>
        <AdminTourForm />
      </div>
    </div>
  );
}

export default page;
