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
function AdminTourForm() {
  return (
    <div className="flex flex-col gap-5">
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
            placeholder="Tour name"
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
            type="text"
            id="duration"
            placeholder="Tour duration"
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
            placeholder="Max Groupe Size"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Difficulty
          </label>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Difficulty" />
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
            placeholder="Tour Price"
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
            placeholder="Price Discount"
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
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder="Enter Summary"
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
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder="Enter Description"
          ></textarea>
        </span>
      </div>
      <Separator />

      <div className="grid grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-form_text"
          >
            Staring Day
          </label>

          <AdminDatePicker />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-form_text"
          >
            Is this tour Secret?
          </label>
          <div className="flex items-center space-x-2 h-full">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Click if the tour is secret
            </label>
          </div>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-form_text"
          >
            Day to stay
          </label>

          <input
            type="number"
            id="day"
            placeholder="Day to Stay"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
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

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((item, idx) => (
                <SelectItem
                  key={idx}
                  value={item.lat.toString + "," + item.lon.toString}
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
            id="address"
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
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder="Description about starting location and address"
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

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="landingCountry" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((item, idx) => (
                <SelectItem
                  key={idx}
                  value={item.lat.toString + "," + item.lon.toString}
                >
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
            id="landingAddress"
            placeholder="Landing Address"
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
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder="Description about Landing address and location"
          ></textarea>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">Choose Guides</h1>
      <div>
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Guides
          </label>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Guide" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="123498">Mamo Lamo</SelectItem>
              <SelectItem value="480384">Dabo Chalo</SelectItem>
              <SelectItem value="408308">Wamo Kamo</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">Upload Tour Images</h1>
      <div className="col-span-6 sm:col-span-5 bg-white p-5 grid grid-cols-6 gap-3 rounded-lg font-medium">
        <div className="col-span-2 p-2 flex flex-col gap-3">
          <h1 className="text-md font-semibold">Primary Image</h1>
          <span className="border p-3">
            <ImagesUpload />
          </span>
        </div>
        <div className="col-span-4 p-2 flex flex-col gap-3">
          <h1 className="text-md font-semibold">Detail Images</h1>
          <span className="border p-3">
            <ImagesUpload />
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminTourForm;
