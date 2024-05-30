import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import Rating from "./Rating";
import { format } from "date-fns";

const ReviewComp = ({ review }) => {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage
          src={review?.user?.photo || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-1">
        <span className="flex justify-between">
          <b>{review?.user?.name}</b>
          <small>
            <b>{format(new Date(2014, 1, 11), "MM/dd/yyyy")}</b>
          </small>
        </span>
        <Rating value={review.rating} />
        <p className="text-sm mt-2">{review?.review}</p>
        <Separator />
      </div>
    </div>
  );
};
function TourReview({ reviews }) {
  return (
    <div>
      {reviews.map((review, idx) => (
        <ReviewComp key={idx} review={review} />
      ))}
    </div>
  );
}

export default TourReview;
