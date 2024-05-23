"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

export default function AdminSmallUsersTable(props) {
  return (
    <Table>
      <Thead>
        <Tr className="bg-primary h-12">
          <Th className="text-white text-start">Profile</Th>
          <Th className="text-white text-start">Name</Th>
          <Th className="text-white text-start">Email</Th>
          <Th className="text-white text-start">Date</Th>
          <Th className="text-white text-start">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr className="h-8 border-b-2">
          <Td>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Td>
          <Td>East Annex</Td>
          <Td>9 April 2019</Td>
          <Td>29/2019</Td>
          <Td className="flex gap-3">
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-red-500 hover:text-red-600 hover:underline"
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-primary hover:text-primary/90 hover:underline"
            >
              Update
            </Button>
          </Td>
        </Tr>
        <Tr className="h-8 border-b-2">
          <Td>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Td>
          <Td>East Annex</Td>
          <Td>9 April 2019</Td>
          <Td>29/2019</Td>
          <Td className="flex gap-3">
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-red-500 hover:text-red-600 hover:underline"
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-primary hover:text-primary/90 hover:underline"
            >
              Update
            </Button>
          </Td>
        </Tr>
        <Tr className="h-8 border-b-2 bg-slate-100">
          <Td>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Td>
          <Td>205 Gorgas</Td>
          <Td>19 May 2019</Td>
          <Td>29/2019</Td>
          <Td className="flex gap-3">
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-red-500 hover:text-red-600 hover:underline"
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-primary hover:text-primary/90 hover:underline"
            >
              Update
            </Button>
          </Td>
          
        </Tr>
        <Tr className="h-8 border-b-2">
          <Td>
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Td>
          <Td>Github</Td>
          <Td>29 June 2019</Td>
          <Td>29/2019</Td>
          <Td className="flex gap-3">
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-red-500 hover:text-red-600 hover:underline"
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              className="p-0 font-semibold hover:bg-transparent text-primary hover:text-primary/90 hover:underline"
            >
              Update
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
