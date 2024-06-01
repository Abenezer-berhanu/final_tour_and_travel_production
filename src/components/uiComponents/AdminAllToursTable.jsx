"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { deleteTour } from "@/lib/actions/tours";
import ReviewPopUp from "./ReviewPopUp";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { findUserById } from "@/lib/actions/users";

export default function AdminAllToursTable({ tours }) {
  const [toursData, setToursData] = useState(tours);
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState();
  useLayoutEffect(() => {
    const fetchUserInfo = async () => {
      const user = await findUserById();
      const json = user ? JSON.parse(user) : {};
      setUserInfo(json);
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    let tour = searchParams.get("tour");
    let diff = searchParams.get("diff");
    if (tour) {
      const filteredTours = toursData.filter((item) =>
        item.name.toLowerCase().includes(tour.toLowerCase())
      );
      setToursData(filteredTours);
    } else if (diff) {
      //?diff=easy,difficult [easy, difficult]
      const diffArray = diff.split(",");
      const filteredTours = tours.filter((item) => {
        for (let i = 0; i < diffArray.length; i++) {
          if (item.difficulty == diffArray[i]) {
            return item;
          }
        }
      });
      console.log(filteredTours.length);
      setToursData(filteredTours);
    } else {
      setToursData(tours);
    }
  }, [searchParams]);
  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Image</Th>
          <Th className="text-white text-start">Name</Th>
          <Th className="text-white text-start">Price</Th>
          <Th className="text-white text-start">Difficulty</Th>
          <Th className="text-white text-start">Duration</Th>
          <Th className="text-white text-start">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {toursData?.map((tour, idx) => (
          <Tr key={idx} className={`${idx % 2 === 0 && "bg-slate-100"}`}>
            <Td className="text-sm font-semibold py-3">
              <Avatar className="size-6 border">
                <AvatarImage
                  src={tour?.imageCover || "/assets/defaultTourImage.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Td>
            <Td className="text-sm font-semibold py-1">
              <Link href={`/tour/${tour._id}`}>{tour.name}</Link>
            </Td>
            <Td className="text-sm font-semibold py-1">
              <Link href={`/tour/${tour._id}`}>{tour.price}</Link>
            </Td>
            <Td className="text-sm font-semibold py-1">{tour.difficulty}</Td>
            <Td className="text-sm font-semibold py-1">{tour.duration} Days</Td>
            <Td className="text-sm font-semibold py-1 flex gap-4">
              <form action={deleteTour}>
                <input type="hidden" name="id" value={tour?._id} />
                <Button
                  variant="ghost"
                  className="bg-transparent hover:bg-transparent p-0 text-red-500 hover:underline hover:text-red-600"
                >
                  Delete
                </Button>
              </form>
              <Link
                href={`/admin/tours/${tour?._id}`}
                className="text-primary hover:underline flex items-center"
              >
                Update
              </Link>
              {userInfo?.role == "guide" && <ReviewPopUp tourId={tour?._id} />}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
