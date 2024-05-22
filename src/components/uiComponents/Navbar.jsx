import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import NavbarSearchInput from "./NavbarSearchInput";
import NavbarSheet from "./NavbarSheet";
import NavbarUser from "./NavbarUser";

function Navbar() {
  return (
    <div className="flex w-full min-h-[70px] mb-10 items-center justify-between lg:px-20 md:px-10 px-2 bg-primary text-white">
      <div className="flex gap-3 items-center mr-4">
        <span className="hidden max-md:flex">
          <NavbarSheet />
        </span>
        <NavbarLogo />
      </div>
      <div className="flex items-center">
        <span className="max-md:hidden">
          <NavbarLinks />
        </span>
      </div>
      <div className="flex-1 max-w-[500px] flex gap-3">
        <NavbarSearchInput />
        <NavbarUser />
      </div>
    </div>
  );
}

export default Navbar;