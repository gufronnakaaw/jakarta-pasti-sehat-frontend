import Image from "next/image";

export default function CardPartner() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.0.1)]">
      <Image
        src="/img/logo.svg"
        alt="logo partner"
        width={800}
        height={800}
        className="h-auto w-full"
      />
    </div>
  );
}
