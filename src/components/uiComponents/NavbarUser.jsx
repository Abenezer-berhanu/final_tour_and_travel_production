import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { verifyToken } from "@/lib/VerifyToken";
import { findUserById, signUserOut } from "@/lib/actions/users";
import Link from "next/link";

async function NavbarUser() {
  const userInfo = await verifyToken();
  const userRes = userInfo && (await findUserById(userInfo?.userId));
  const user = userRes && JSON.parse(userRes)
  return (
    <section className="max-md:hidden">
      {userInfo ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                src={user?.photo || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/user/profile"} className="h-full w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/tours"} className="h-full w-full">My tours</Link>
            </DropdownMenuItem>
            {user?.role.toLowerCase() == "admin" && (
              <DropdownMenuItem>
                <Link href={"/user/tours"} className="h-full w-full">Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="hover:bg-none font-semibold">
              <form action={signUserOut}>
                <button className="w-full my-2" type="submit">
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="mx-2 flex gap-3 items-center h-full">
          <Link
            className="font-semibold text-white hover:underline"
            href={"login"}
          >
            Log in
          </Link>
        </div>
      )}
    </section>
  );
}

export default NavbarUser;
