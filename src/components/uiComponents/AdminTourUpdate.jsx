"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import AdminDatePicker from "./AdminDatePicker";
import { Checkbox } from "../ui/checkbox";
import { countries } from "@/lib/countries";
import ImagesUpload from "./ImagesUpload";
import PrimaryImageUpload from "./PrimaryImageUpload";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { updateTour } from "@/lib/actions/tours";
import { useFormState, useFormStatus } from "react-dom";
import MultipleSelect from "./MultipleSelect";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function AdminTourUpdate({ tour }) {
  const { push } = useRouter();
  const [state, formAction] = useFormState(updateTour, null);
  const { images, coverImage, startingDate, chosenGuides } = useSelector(
    (state) => state.images
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("New Tour created successfully");
      push(`/admin/tours`);
    } else if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative w-fit">
        {pending ? <Spinner height={30} /> : "Submit"}
      </Button>
    );
  };
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="startingDate" value={startingDate} />
      <input type="hidden" name="guides" value={chosenGuides} />
      <input type="hidden" name="tourId" value={tour._id} />
      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder={tour.name}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-form_text"
          >
            Duration
          </label>

          <input
            type="number"
            id="duration"
            name="duration"
            placeholder={tour.duration}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="maxGroupSize"
            className="block text-sm font-medium text-form_text"
          >
            Max Groupe Size
          </label>

          <input
            type="number"
            id="maxGroupSize"
            name="maxGroupSize"
            placeholder={tour.maxGroupSize}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>
      </div>
      {/* //////////////////////////////////////// */}
      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Difficulty
          </label>

          <Select name="difficulty">
            <SelectTrigger className="w-full">
              <SelectValue placeholder={tour.difficulty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-form_text"
          >
            Price
          </label>

          <input
            type="number"
            id="price"
            name="price"
            placeholder={tour.price}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="priceDiscount"
            className="block text-sm font-medium text-form_text"
          >
            Price Discount
          </label>

          <input
            type="number"
            id="priceDiscount"
            name="discount"
            placeholder={tour.priceDiscount}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>
      </div>

      <Separator />
      <div className="grid grid-cols-2 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-form_text"
          >
            Summary
          </label>

          <textarea
            id="summary"
            name="summary"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={tour.summary}
          ></textarea>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={tour.description}
          ></textarea>
        </span>
      </div>
      <Separator />

      <div className="grid grid-cols-2 gap-3">
        <span className="flex flex-col gap-1 border p-2">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-form_text"
          >
            Staring Date
          </label>

          <AdminDatePicker />
        </span>

        <span className="flex flex-col gap-1 border p-2">
          <label
            htmlFor="secreteTour"
            className="block text-sm font-medium text-form_text"
          >
            Is this tour Secret?
          </label>
          <div className="flex items-center space-x-2 h-full">
            <Checkbox
              name="isSecrete"
              id="secreteTour"
              checked={tour.secretTour}
            />
            <label
              htmlFor="secreteTour"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Click if the tour is secret
            </label>
          </div>
        </span>
      </div>
      <Separator />

      <h1 className="text-lg font-semibold">Starting Location</h1>
      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Country
          </label>

          <Select name="startCountry">
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"Country"} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((item, idx) => (
                <SelectItem
                  key={idx}
                  value={[item.lat.toString() + "," + item.lon.toString()]}
                >
                  {item.countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-form_text"
          >
            Starting Address
          </label>

          <input
            type="text"
            id="startAddress"
            name={tour.startLocation.address || tour.startLocation[0].address}
            placeholder="Start Address"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="startingDescription"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="startingDescription"
            name="startDescription"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={
              tour.startLocation.description ||
              tour.startLocation[0].description
            }
          ></textarea>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">Location</h1>
      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="landingCountry"
            className="block text-sm font-medium text-form_text"
          >
            Landing Country
          </label>

          <Select name="landingCountry">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="landingCountry" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((item, idx) => (
                <SelectItem key={idx} value={[item.lat + "," + item.lon]}>
                  {item.countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="landingAddress"
            className="block text-sm font-medium text-form_text"
          >
            Landing Address
          </label>

          <input
            type="text"
            name="landingAddress"
            id="landingAddress"
            placeholder={tour.location.address || tour.location[0].address}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="landingDescription"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="landingDescription"
            name="landingDescription"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={
              tour.location.description || tour.location[0].description
            }
          ></textarea>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">Choose Guides</h1>
      <div>
        <MultipleSelect guides={tour.guides} />
      </div>

      <Separator />
      <h1 className="font-semibold text-md">Upload Tour Images</h1>
      <div className="col-span-6 sm:col-span-5 bg-white p-5 grid grid-cols-6 gap-3 rounded-lg font-medium">
        <div className="col-span-2 p-2 flex flex-col gap-3">
          <h1 className="text-sm font-semibold">Primary Image</h1>
          <span className="border p-3">
            <PrimaryImageUpload />
          </span>
        </div>
        <div className="col-span-4 p-2 flex flex-col gap-3">
          <h1 className="font-semibold text-sm">Detail Images</h1>
          <span className="border p-3">
            <ImagesUpload />
          </span>
        </div>
      </div>
      <Submit />
    </form>
  );
}

export default AdminTourUpdate;
