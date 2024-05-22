"use client";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

function ProfileForm() {
  const [active, setActive] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    photo: "",
  });
  useEffect(() => {
    if (inputs.name || inputs.email || inputs.photo) {
      setActive(false);
    }
  }, [inputs.name, inputs.email, inputs.photo]);
  const onDrop = useCallback((acceptedFiles) => {
    setInputs((state) => ({ ...state, [state.photo]: acceptedFiles[0] }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = async (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await updateMe(inputs).unwrap();
      if (!res.error) {
        toast.success("your profile has been updated successfully");
      }
    } catch (err) {
      console.log(err);
    }
    if (error) {
      toast.error("An error has occurred please try again");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="p-5 bg-white grid grid-cols-4 gap-2 sm:gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Personal Information</b>
          <p className="text-slate-700 text-sm">
            Update your personal detail here.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-100 rounded-md p-5 grid grid-cols-2 gap-7">
          <label htmlFor="fullname" className="flex flex-col col-span-2">
            <span className="font-semibold">Name</span>
            <input
              type="name"
              id="fullname"
              name="name"
              onChange={handleChange}
              placeholder={"Name"}
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>

          <label htmlFor="UserEmail" className="flex flex-col col-span-2">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              name="email"
              id="UserEmail"
              onChange={handleChange}
              placeholder={"Email"}
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>
        </div>
      </div>

      <div className="p-5 bg-white grid grid-cols-4 gap-2 sm:gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Profile Photo</b>
          <p className="text-slate-700 text-sm whitespace-pre-line">
            This image will be displayed on your profile.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-100 rounded-md p-5 grid grid-cols-6 gap-7">
          <div className="col-span-6 sm:col-span-1">
            <Avatar className="size-14 overflow-hidden">
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                className="size-14 rounded-full"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </div>
          <div className="col-span-6 sm:col-span-5 bg-white p-5 rounded-lg font-medium">
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center"
            >
              <input {...getInputProps()} />

              {isDragActive ? (
                <b>Drop the files here ...</b>
              ) : (
                <>
                  <span className="p-2 ring-1 rounded-full mb-2">
                    <FaCloudUploadAlt size={54} className="text-sky-500" />
                  </span>
                  <p>
                    <b>Click to upload</b> or drag and drop
                  </p>
                  <p>JPG, PNG, of GIF (Max size 2MB)</p>
                </>
              )}
            </div>
          </div>
          <Button
            className="bg-slate-500 hover:bg-slate-400 text-white w-fit px-2 py-2 ml-auto col-span-6"
            size="small"
            disabled
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white grid grid-cols-4 gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Password</b>
          <p className="text-slate-700 text-sm">
            Enter your current password to make update.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-100 rounded-md p-5 flex flex-col gap-7">
          <label htmlFor="password" className="flex flex-col">
            <span className="font-semibold">Current Password</span>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>

          <label htmlFor="newPassword" className="flex flex-col">
            <span className="font-semibold">New Password</span>
            <input
              type="newPassword"
              id="newPassword"
              placeholder="New Password"
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>
        </div>
        <Button
          className="my-2 ml-auto col-span-6"
          disabled={active}
          type="submit"
        >
          Update profile
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
