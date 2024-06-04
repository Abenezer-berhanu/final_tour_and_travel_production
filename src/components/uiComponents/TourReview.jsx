import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import Rating from "./Rating";
import { format } from "date-fns";

const ReviewComp = ({ review }) => {
  console.log(review)
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage
          src={review?.user?.photo || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="flex gap-2">
            <b>{review?.user?.name}</b>{" "}
            <Badge
              className={
                "w-16 flex items-center justify-center font-bold tracking-wide ring-1 text-white"
              }
            >
              {review?.user?.role}
            </Badge>
          </span>
          <small>
            <b>{format(new Date(review.createdAt), "MM/dd/yyyy")}</b>
          </small>
        </div>
        <Rating value={review?.rating} />
        <p className="text-sm mt-2">{review?.review}</p>
        <Separator />
      </div>
    </div>
  );
};
function TourReview({ reviews }) {
  console.log(reviews)
  return (
    <div>
      {reviews.map((review, idx) => (
        <ReviewComp key={idx} review={review} />
      ))}
    </div>
  );
}

export default TourReview;
