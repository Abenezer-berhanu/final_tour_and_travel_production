"use client";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import Spinner from "@/components/uiComponents/Spinner";
import TourCard from "@/components/uiComponents/TourCard";
import { fetchClosestTour } from "@/lib/actions/tours";
import { useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";

const LocationComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    // Check if geolocation is supported
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          // Get latitude and longitude
          const data = await fetchClosestTour(
            position.coords.latitude,
            position.coords.longitude
          );
          if (data?.success) {
            setData(data?.success);
          }
          if (data?.error) {
            toast.error(data?.error);
          }
          setIsLoading(false);
        },
        function (error) {
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen ">
      <h1 className="text-xl font-bold mb-10">Closest Tours</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data.length > 0 ? (
            <div className="grid grid-cols-4">
              {data.map((item, idx) => (
                <TourCard key={idx} data={item} />
              ))}
            </div>
          ) : (
            <ErrorAlert
              info={true}
              description={"No close tour has found."}
              safe={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
