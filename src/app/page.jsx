import { Button } from "@/components/ui/button";
import HomeCarousel from "@/components/uiComponents/HomeCarousel";
import TourCard from "@/components/uiComponents/TourCard";
import CheapToursCard from "@/components/uiComponents/cheapToursCard";
import { fetchAllTours } from "@/lib/actions/tours";

async function page() {
  const res = await fetchAllTours();
  const tours = res ? JSON.parse(res) : null;
  return (
    <div className="p-5 ">
      <HomeCarousel />
      <div className="mt-20 max-w-7xl mx-auto flex flex-col gap-3">
        <div className="my-5">
          <span className="flex justify-between items-center">
            <b className="text-lg">Cheap Tours</b>
          </span>

          <div className="flex overflow-x-auto overflow-y-hidden height-[300px] py-3 gap-3 scrollbox">
            {tours.slice(3).map((tour, idx) => (
              <CheapToursCard key={idx} data={tour} />
            ))}
          </div>
        </div>

        <>
          <span className="flex justify-between items-center">
            <b className="text-xl">Popular Places</b>
            <Button variant="ghost" className="hover:bg-none text-primary">
              view more
            </Button>
          </span>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tours.map((tour, idx) => (
              <TourCard key={idx} data={tour} />
            ))}
          </div>
        </>
      </div>
    </div>
  );
}

export default page;
