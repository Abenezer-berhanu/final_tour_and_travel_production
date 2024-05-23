"use client";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

function AdminDatePicker() {
  const [date, setDate] = useState(null);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border border-black p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date > new Date() - 1}
             initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default AdminDatePicker;
