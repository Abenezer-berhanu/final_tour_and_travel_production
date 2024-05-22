import MyTourCard from "@/components/uiComponents/MyTourCard";
import { myTours } from "@/lib/myTours";

function page() {
  return (
    <>
     <h1 className="text-2xl font-bold mb-10">My Tours</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1200px] mx-auto">
     
      {myTours.map((item, idx) => (
        <MyTourCard key={idx} item={item} />
    ))}
    </div>
    </>
  );
}

export default page;
