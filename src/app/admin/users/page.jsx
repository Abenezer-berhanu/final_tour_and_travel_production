import AdminAllUsersTable from "@/components/uiComponents/AdminAllUsersTable";
import Spinner from "@/components/uiComponents/Spinner";
import { getAllUsers } from "@/lib/actions/users";
import React, { Suspense } from "react";

async function page() {
  const usersRes = await getAllUsers();
  const users = usersRes ? JSON.parse(usersRes) : [];
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">All Users</h1>
      <Suspense fallback={<Spinner height={50}/>}>
        <AdminAllUsersTable users={users} />
      </Suspense>
    </div>
  );
}

export default page;
