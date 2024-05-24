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
import { findUserById } from "@/lib/actions/users";
import Link from "next/link";

async function NavbarUser() {
  const userInfo = await verifyToken();
  const user = userInfo && (await findUserById(userInfo?.userId));
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
              <Link href={"/user/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/tours"}>My tours</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-none font-semibold">
              <button className="w-full my-2">Log out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="mx-2 flex gap-3 items-center h-full">
          <Link
            className="font-semibold text-black hover:underline"
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
