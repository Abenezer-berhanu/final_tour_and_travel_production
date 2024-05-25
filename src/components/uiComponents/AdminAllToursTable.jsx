"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { deleteTour } from "@/lib/actions/tours";

export default function AdminAllToursTable({ tours }) {
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
        {tours?.map((tour, idx) => (
          <Tr key={idx} className={`${idx % 2 === 0 && "bg-slate-100"}`}>
            <Td className="text-sm font-semibold py-3">
              <Avatar className="size-6 border">
                <AvatarImage
                  src={tour?.imageCover || "/assets/defaultTourImage.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Td>
            <Td className="text-sm font-semibold py-1">{tour.name}</Td>
            <Td className="text-sm font-semibold py-1">{tour.price}</Td>
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
                href={`/admin/tour/${tour?._id}`}
                className="text-primary hover:underline flex items-center"
              >
                Update
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
