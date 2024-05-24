"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import { loginUser } from "@/lib/actions/users";

export default function SigninForm() {
  const [state, formAction] = useFormState(loginUser, null);
  useEffect(() => {
    if (state?.success) {
      console.log(state);
    } else {
      console.log(state);
    }
  }, [state]);
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
      <span className="flex flex-col gap-2">
        <p className="font-semibold">password:</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white"
        />
      </span>
      <Link
        href={"/user/forgotPassword"}
        className="text-sm ml-auto my-2 font-medium"
      >
        Forgot Password
      </Link>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
