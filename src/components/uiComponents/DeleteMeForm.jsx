"use client";
import { deleteAccount } from "@/lib/actions/users";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
function DeleteMeForm() {
  const [state, formAction] = useFormState(deleteAccount, null);
  const { push } = useRouter();
  useEffect(() => {
    if (state?.success) {
      push("/auth/signin");
    }
  }, [state]);
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="purpose" value={"temporary"} />
        <Button className="my-2 ml-auto col-span-6 w-full duration-300 bg-red-500 text-white hover:bg-red-600">
          Temporary Delete account
        </Button>
      </form>
      <form action={formAction}>
        <input type="hidden" name="purpose" value={"permanent"} />
        <Button className="my-2 ml-auto col-span-6 w-full bg-red-500 duration-300 text-white hover:bg-red-600">
          Permanent Delete account
        </Button>
      </form>
    </>
  );
}

export default DeleteMeForm;
