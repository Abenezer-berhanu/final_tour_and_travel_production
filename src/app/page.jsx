import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import HomeCarousel from "@/components/uiComponents/HomeCarousel";
import Spinner from "@/components/uiComponents/Spinner";
import Top5Cheap from "@/components/uiComponents/Top5Cheap";
import TourCard from "@/components/uiComponents/TourCard";
import CheapToursCard from "@/components/uiComponents/cheapToursCard";
import { fetchAllTours, fetchTop5Cheap } from "@/lib/actions/tours";
import { Suspense } from "react";

async function page() {
  const res = await fetchAllTours();
  const tours = res ? JSON.parse(res) : null;
  const cheapToursRes = await fetchTop5Cheap();
  const top5Cheap = cheapToursRes ? JSON.parse(cheapToursRes) : null;

  return (
    <div className="p-5 ">
      <HomeCarousel />
      {tours && top5Cheap ? (
        <div className="mt-20 max-w-7xl mx-auto flex flex-col gap-3">
          <Top5Cheap top5Cheap={top5Cheap} />

          <>
            <span className="flex justify-between items-center">
              <b className="text-xl">Popular Places</b>
              <Button variant="ghost" className="hover:bg-none text-primary">
                view more
              </Button>
            </span>

            <Suspense fallback={<Spinner />}>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tours.map((tour, idx) => (
                  <TourCard key={idx} data={tour} />
                ))}
              </div>
            </Suspense>
          </>
        </div>
      ) : (
        <div className="mt-20">
          <ErrorAlert
            description={
              "Something went wrong please check your connection and try again."
            }
          />
        </div>
      )}
    </div>
  );
}

export default page;
