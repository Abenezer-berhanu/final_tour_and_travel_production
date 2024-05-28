import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import MyTourCard from "@/components/uiComponents/MyTourCard";
import { findBooks } from "@/lib/actions/book";
import { myTours } from "@/lib/myTours";

async function page() {
  const booksRes = await findBooks();
  const books = (booksRes && JSON.parse(booksRes)) || null;
  return (
    <>
      <h1 className="text-2xl font-bold mb-10">My Tours</h1>
      {books ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1200px] mx-auto">
          {books.map((item, idx) => (
            <MyTourCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <ErrorAlert
          description={"Please check your connection and try again."}
        />
      )}
    </>
  );
}

export default page;
