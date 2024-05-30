import AdminAllToursTable from "@/components/uiComponents/AdminAllToursTable";
import AdminTourSearchInput from "@/components/uiComponents/AdminToursSearchInput";
import Spinner from "@/components/uiComponents/Spinner";
import { getAllTours } from "@/lib/actions/tours";
import { Suspense } from "react";

async function page() {
  const toursRes = await getAllTours();
  const tours = toursRes ? await JSON.parse(toursRes) : [];
  return (
    <div className="flex flex-col gap-3">
      <span className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tours</h1>
        <AdminTourSearchInput />
      </span>

      <Suspense fallback={<Spinner height={50} />}>
        <AdminAllToursTable tours={tours} />
      </Suspense>
    </div>
  );
}

export default page;
