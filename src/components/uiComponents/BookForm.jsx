"use client";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function BookForm({ size }) {
  return (
    <form action="" className="w-full flex flex-col gap-3">
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <Select name="quantity">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Quantity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-black">
            {Array.from({ length: size }).map((_, idx) => (
              <SelectItem value={String(idx + 1)} key={idx}>
                {idx + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button className="w-full">Reserve</Button>
    </form>
  );
}

export default BookForm;
