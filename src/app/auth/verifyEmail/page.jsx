import { Button } from "@/components/ui/button";
import Spinner from "@/components/uiComponents/Spinner";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  const error = false;
  const data = true;
  const isLoading = false;
  return (
    <div className="bg-gray-100 w-full flex flex-col justify-center items-center h-fit p-20">
      <Image
        width={500}
        height={500}
        src="/assets/emailVerificationLogo.png"
        alt="email verification logo"
        className="max-w-[200px]"
      />
      {error && (
        <h1 className="text-3xl font-bold">
          Email verification link seems expired.
        </h1>
      )}
      {data && (
        <h1 className="text-3xl font-bold mb-40 text-center">
          your email has been verified. <br /> <span className="text-2xl">Please login to your account</span>
        </h1>
      )}
      {isLoading && (
        <p className="text-3xl font-bold mb-40">
          Your email is being verified please wait...
        </p>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}

export default page;
