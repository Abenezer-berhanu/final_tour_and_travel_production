import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BookForm from "@/components/uiComponents/BookForm";
import DetailPageMap from "@/components/uiComponents/DetailPageMap";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import Rating from "@/components/uiComponents/Rating";
import TourCard from "@/components/uiComponents/TourCard";
import { fetchTourById } from "@/lib/actions/tours";
import tours from "@/lib/tour";
import Image from "next/image";

async function page({ params }) {
  const { tourId: id } = params;
  const res = await fetchTourById(id);
  const data = res ? JSON.parse(res) : null;
  return (
    <div className="min-h-screen">
      {!data ? (
        <div>
          <ErrorAlert
            description={
              "Something went wrong please check your connection and try again."
            }
          />
        </div>
      ) : (
        <div className="w-full max-w-[1300px] px-3 h-full mx-auto">
          <div className="grid grid-cols-8 gap-5">
            <div className="col-span-8 sm:col-span-3 flex flex-col gap-4">
              <Image
                width={500}
                height={500}
                alt={data.name}
                src={data.imageCover}
                className="w-full"
              />
              <hr />
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {data.images.map((image, idx) => (
                  <Image
                    width={500}
                    height={500}
                    alt={data.name}
                    src={image}
                    key={idx}
                    className="max-w-[130px] rounded-md"
                  />
                ))}
                {data.images.map((image, idx) => (
                  <Image
                    width={500}
                    height={500}
                    alt={data.name}
                    src={image}
                    key={idx}
                    className="max-w-[130px] rounded-md"
                  />
                ))}
              </div>
            </div>

            <div className="sm:col-span-5 md:col-span-3 col-span-8 shadow-md px-2 pb-3 flex flex-col gap-2 bg-slate-50">
              <div className="flex max-sm:flex-col gap-3 sm:justify-between sm:items-center">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <Rating
                    value={data.ratingsAverage}
                    text={data.ratingsAverage}
                  />
                </div>
                <span>
                  <Badge
                    variant={
                      data.difficulty == "easy"
                        ? ""
                        : data.difficulty == "medium"
                        ? "secondary"
                        : data.difficulty == "hard"
                        ? "destructive"
                        : ""
                    }
                    className={
                      "w-16 flex items-center justify-center font-bold tracking-wide ring-1"
                    }
                  >
                    {data.difficulty}
                  </Badge>
                </span>
              </div>
              <b>Location:</b>
              <span className="w-full flex flex-col gap-2 bg-white shadow-sm border px-2 rounded-md text-sm mb-2 py-2">
                <span className="flex gap-2 ">
                  <b>From:</b>{" "}
                  <b className="whitespace-pre-line">
                    {data.startLocation.description}
                  </b>
                </span>
                <Separator />
                <span>
                  <b>To:</b>{" "}
                  <b className="text-slate-500">
                    {data.location.address || data.location[0].address}
                  </b>
                </span>
              </span>
              <span className="w-full flex gap-5 bg-white shadow-sm border px-2 rounded-md text-sm my-2 py-2">
                <span className="flex flex-col">
                  <b>Duration:</b> <b>{data.duration}</b>
                </span>
                <Separator orientation="vertical" />
                <span className="flex flex-col">
                  <b>Max Group:</b> <b>{data.maxGroupSize}</b>
                </span>
              </span>
              <div className="flex items-end gap-1">
                <h1 className="text-xl font-bold tracking-tighter">
                  ${data.price}
                </h1>
                {data.priceDiscount > 0 && <h1 className="font-bold text-slate-500">
                  $<s>{data.price + data.priceDiscount}</s>
                </h1>}
              </div>
              <div className="flex item-center gap-2 outline-none">
                <b>Amount: </b>
                <BookForm size={data.maxGroupSize} />
              </div>
              <hr />
              <hr />

              <div className="flex flex-col gap-2 relative">
                <b>Summary:</b>
                <span className="max-h-[300px] overflow-y-auto w-full bg-white no-scrollbar p-1 whitespace-pre-line pb-5">
                  {data.summary}
                </span>
                <div className="w-full h-6 bg-gradient-to-t from-white to-white/30 absolute bottom-0"></div>
              </div>
            </div>

            <div className="sm:col-span-5 md:col-span-2 col-span-8 h-fit">
              {/* guider  */}
              <div className="flex flex-col gap-3 border p-2">
                {" "}
                <b>Guides: </b>
                {data.guides.map((item, idx) => (
                  <div className="bg-slate-50 shadow-md w-full px-1" key={idx}>
                    <span className="flex items-center justify-start px-2">
                      <Avatar>
                        <AvatarFallback>
                          <AvatarImage
                            src={item.photo || "https://github.com/shadcn.png"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </AvatarFallback>
                      </Avatar>
                      <span className="p-2">
                        <b>{item.name}</b>
                        <p className="text-sm">{item.email}</p>
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 relative my-3 bg-slate-50 p-1 rounded-md">
                <b>Description:</b>
                <span className="max-h-[300px] overflow-y-auto w-full no-scrollbar p-1 whitespace-pre-line pb-5">
                  {data.description}
                </span>
                <div className="w-full h-6 bg-gradient-to-t from-white to-white/30 absolute bottom-0"></div>
              </div>
            </div>
          </div>
          <div className="w-full my-10">
            <div className="w-full">{/* <DetailPageMap /> */}</div>
            <hr />
            <h1 className="font-bold text-lg py-3">Related Tours</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tours.map((data, idx) => (
                <TourCard data={data} key={idx} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
