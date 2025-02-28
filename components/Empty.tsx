import Image from "next/image";

type EmptyDataProps = {
  text: string;
};

export default function EmptyData({ text }: EmptyDataProps) {
  return (
    <div className="grid justify-items-center gap-8 rounded-2xl border-2 border-dashed border-gray/20 py-12">
      <Image
        src="/img/empty-box.svg"
        alt="empty data img"
        width={1440}
        height={1008}
        className="h-auto max-w-[300px]"
      />

      <h1 className="max-w-[600px] text-center text-[28px] font-extrabold capitalize leading-[120%] -tracking-[1px] text-black">
        {text}
      </h1>
    </div>
  );
}
