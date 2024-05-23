import AdminSmallUsersTable from "@/components/uiComponents/AdminSmallUsersTable";

function page() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">All Tours</h1>
      <AdminSmallUsersTable />
    </div>
  );
}

export default page;
