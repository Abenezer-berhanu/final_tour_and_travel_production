import Image from "next/image";
import Link from "next/link";

function MyTourCard({item}) {

  return (
    <div className="flex bg-white transition border hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          <span>{item.year}</span>
          <span>{item.date}</span>
        </div>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <Image
          width={500}
          height={500}
          alt={item.title}
          src={item.image}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <Link href="#">
            <h3 className="font-bold uppercase text-gray-900">{item.title}</h3>
            <h5 className="font-semibold uppercase text-slate-700">${item.price}</h5>
          </Link>

          <p className="mt-2 line-clamp-5 text-sm/relaxed text-gray-700">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyTourCard;
