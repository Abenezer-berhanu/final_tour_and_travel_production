import DashboardStatCards from "@/components/uiComponents/DashboardStatCards";
import { GiSubway } from "react-icons/gi";
import { FaUser, FaUserCheck, FaUserMinus } from "react-icons/fa";
import AdminSmallUsersTable from "@/components/uiComponents/AdminSmallUsersTable";
import { AdminPieChart } from "@/components/uiComponents/AdminPieChart";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-4 gap-3">
        <DashboardStatCards
          title={"Total Tours"}
          amount={800}
          link={"tours"}
          icon={<GiSubway size={20} />}
        />
        <DashboardStatCards
          title={"Total Users"}
          amount={800}
          link={"users"}
          icon={<FaUser size={20} />}
        />
        <DashboardStatCards
          title={"Active Users"}
          amount={800}
          link={"users?type=active"}
          icon={<FaUserCheck size={20} />}
        />
        <DashboardStatCards
          title={"InActive Users"}
          amount={800}
          link={"users?type=inactive"}
          icon={<FaUserMinus size={20} />}
        />
      </div>
      <div className="grid grid-cols-11 gap-2">
        {/* for the 5 users and tours */}
        <div className="flex flex-col gap-4 col-span-8">
          <span className="py-3">
            <span className="flex justify-between items-center py-1">
              <h1 className="text-xl font-bold">Users</h1>{" "}
              <Link
                href="/admin/users"
                className="text-sm font-semibold text-primary "
              >
                Sell all
              </Link>
            </span>
            <AdminSmallUsersTable />
          </span>
          <span>
            <span className="flex justify-between items-center py-1">
              <h1 className="text-xl font-bold">Tours</h1>{" "}
              <Link
                href="/admin/users"
                className="text-sm font-semibold text-primary "
              >
                Sell all
              </Link>
            </span>

            <AdminSmallUsersTable />
          </span>
        </div>
        {/* for the right pie chart */}
        <div className="col-span-3 w-full border mt-10">
          <AdminPieChart />
        </div>
      </div>
    </div>
  );
}

export default page;
