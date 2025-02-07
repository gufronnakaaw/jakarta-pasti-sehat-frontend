import Image from "next/image";
import Link from "next/link";

export default function CardTeam() {
  return (
    <Link
      href="/our-teams/asd"
      className="group grid overflow-hidden rounded-2xl bg-white shadow-[4px_2px_18px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src="/img/testing/individual-img.png"
          alt="thumbnail article"
          width={800}
          height={800}
          className="aspect-square scale-105 object-cover object-center transition-all group-hover:scale-110" // remove scale-105, if data already dinamis
        />

        {/* === overlay === */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
      </div>

      <div className="grid gap-1 [padding:2rem_1.5rem]">
        <h1 className="line-clamp-2 text-[22px] font-extrabold leading-[120%] text-black group-hover:text-orange">
          Nama Individual
        </h1>
        <p className="line-clamp-1 text-sm font-medium leading-[180%] text-orange">
          Jabatan Individual
        </p>
      </div>
    </Link>
  );
}
