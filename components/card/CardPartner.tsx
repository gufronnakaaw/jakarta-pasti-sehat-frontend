import Image from "next/image";

type CardPartnerProps = {
  partner_id: string;
  alt?: string;
  description?: string;
  image_url: string;
};

export default function CardPartner(partner: CardPartnerProps) {
  return (
    <div className="flex aspect-square size-[100px] items-center justify-center rounded-2xl bg-white p-6 shadow-[4px_2px_18px_rgba(0,0,0,0.1)] xl:size-[170px]">
      <Image
        src={partner.image_url}
        alt={partner.alt as string}
        width={800}
        height={800}
        className="h-auto w-full"
      />
    </div>
  );
}
