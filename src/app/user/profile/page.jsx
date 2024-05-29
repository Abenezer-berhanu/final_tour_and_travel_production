import DeleteMeForm from "@/components/uiComponents/DeleteMeForm";
import ProfileForm from "@/components/uiComponents/ProfileForm";
import { verifyToken } from "@/lib/VerifyToken";
import { findUserById } from "@/lib/actions/users";

async function Profile() {
  const { userInfo } = await verifyToken();
  const userRes = await findUserById(userInfo?.userId);
  const user = userRes && JSON.parse(userRes);

  return (
    <div className="bg-slate-50 w-full h-full relative overflow-hidden p-2  sm:p-8">
      <div className="max-w-[1200px] mx-auto py-3 flex flex-col gap-3">
        <div className="py-5 flex flex-col gap-1">
          <b className="text-xl">Profile</b>
          <p className="text-slate-700 text-sm">Update Your Profile</p>
        </div>
        <hr />
        <ProfileForm userId={userId} user={user} />
        <DeleteMeForm userId={userId} />
      </div>
    </div>
  );
}

export default Profile;
