"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "@/lib/actions/users";
import Spinner from "./Spinner";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const [state, formAction] = useFormState(loginUser, null);
  useEffect(() => {
    if (state?.success) {
      push("/");
      toast.success(state.success);
    } else {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative">
        {pending ? <Spinner height={30} /> : "Sign in"}
      </Button>
    );
  };
  return (
    <form action={formAction} className="w-full flex flex-col gap-3">
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Email:</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white"
        />
      </span>
      <span className="relative flex">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="border py-2 bg-slate-50 w-full rounded-md indent-2 outline-none focus:bg-white"
        />
        {showPassword ? (
          <IoEyeOff
            className="absolute top-0 bottom-0 my-auto right-2 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <IoEye
            className="absolute top-0 bottom-0 my-auto right-2 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </span>
      <Link
        href={"/user/forgotPassword"}
        className="text-sm ml-auto my-2 font-medium"
      >
        Forgot Password
      </Link>
      <Submit />
    </form>
  );
}
