"use client";
import { payWithStripe } from "@/lib/actions/tours";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function BookForm({ tourId, image, name, price, size }) {
  const { push } = useRouter();
  const [state, formAction] = useFormState(payWithStripe, null);
  console.log(tourId);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.url) {
      push(state.url);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full">
        {pending ? <Spinner height={30} /> : "Reserve"}
      </Button>
    );
  };
  return (
    <form action={formAction} className="w-full flex flex-col gap-3">
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="price" value={price} />
      <input type="hidden" name="tourId" value={tourId} />

      <Select name="quantity" required>
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
      <Submit />
    </form>
  );
}

export default BookForm;
