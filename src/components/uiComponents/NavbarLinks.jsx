import navItems from "@/lib/navItems";
import Link from "next/link";

function NavbarLinks() {
  return (
    <div className="flex items-center mx-3 gap-5">
      {navItems.map((data, idx) => (
        <p
          key={idx}
          className="font-semibold tracking-wide capitalize hover:text-primary"
        >
          <Link href={data.link}>{data.label}</Link>
        </p>
      ))}
    </div>
  );
}

export default NavbarLinks;
