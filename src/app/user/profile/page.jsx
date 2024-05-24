import { Button } from "@/components/ui/button";
import ProfileForm from "@/components/uiComponents/ProfileForm";
import { verifyToken } from "@/lib/VerifyToken";
import { findUserById } from "@/lib/actions/users";

async function Profile() {
  const { userId } = await verifyToken();
  const user = await findUserById(userId);
  return (
    <div className="bg-slate-50 w-full h-full relative overflow-hidden p-2  sm:p-8">
      <div className="max-w-[1200px] mx-auto py-3 flex flex-col gap-3">
        <div className="py-5 flex flex-col gap-1">
          <b className="text-xl">Profile</b>
          <p className="text-slate-700 text-sm">Update Your Profile</p>
        </div>
        <hr />
        <ProfileForm userId={userId} user={user} />
        <Button className="my-2 ml-auto col-span-6 w-full duration-300 bg-red-500 text-white hover:bg-red-600">
          Temporary Delete account
        </Button>
        <Button className="my-2 ml-auto col-span-6 w-full bg-red-500 duration-300 text-white hover:bg-red-600">
          Permanent Delete account
        </Button>
      </div>
    </div>
  );
}

export default Profile;
