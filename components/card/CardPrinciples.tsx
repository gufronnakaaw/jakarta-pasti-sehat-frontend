import {
  ChatsCircle,
  Handshake,
  IconContext,
  UsersThree,
} from "@phosphor-icons/react";

const priciples = [
  {
    id: 1,
    icon: UsersThree,
    title: "Community",
    text: "Bersama kita kuat! Jakarta Pasti Sehat hadir untuk membangun komunitas sehat yang saling mendukung dan peduli antarwarga Jakarta.",
  },
  {
    id: 2,
    icon: ChatsCircle,
    title: "Relateble",
    text: "Dekat dan bisa diandalkan, setiap program dan informasi yang kami tawarkan relevan dengan kebutuhan sehari-hari warga Jakarta.",
  },
  {
    id: 3,
    icon: Handshake,
    title: "Collaboration",
    text: "Kolaborasi adalah kunci! Kami bekerja sama dengan berbagai pihak untuk menciptakan solusi kesehatan yang berdampak besar.",
  },
];

export default function CardPrinciples() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:gap-8">
      <IconContext.Provider
        value={{
          weight: "bold",
          size: 64,
          className: "text-orange",
        }}
      >
        {priciples.map((item, index) => (
          <div
            key={index}
            className="grid gap-6 rounded-3xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.0.1)]"
          >
            <item.icon />

            <div className="grid gap-1">
              <h1 className="text-[24px] font-extrabold -tracking-[1px] text-black lg:text-[32px]">
                {item.title}
              </h1>
              <p className="font-medium leading-[180%] text-gray">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </IconContext.Provider>
    </div>
  );
}
