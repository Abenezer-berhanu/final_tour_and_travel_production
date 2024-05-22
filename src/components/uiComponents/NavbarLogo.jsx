import Link from "next/link";


function NavbarLogo() {
  return (
    <Link
      href={"/"}
      className="text-xl md:text-2xl lg:text-3xl max-ssm:hidden font-bold"
    >
      <span className="text-primary">Adventure</span>Hub
    </Link>
  );
}

export default NavbarLogo;