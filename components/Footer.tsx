import Image from "next/image";
import Link from "next/link";

const footerMenu = [
  {
    key: "about",
    title: "Tentang Kami",
    list: [
      { url: "/about-us", label: "Tentang Kami" },
      { url: "/careers", label: "karir" },
      { url: "/team", label: "Tim Kami" },
      { url: "/partners", label: "Mitra" },
    ],
  },
  {
    key: "navigation",
    title: "Pintasan",
    list: [
      { url: "/documentations", label: "Dokumentasi" },
      { url: "/articles", label: "Artikel Terbaru" },
      { url: "/events", label: "Event" },
      { url: "/volunteers", label: "Volunteer" },
    ],
  },
  {
    key: "sosmed",
    title: "Sosial Media",
    list: [
      { url: "mailto:jktpastisehat@gmail.com", label: "Email" },
      { url: "https://instagram.com/pastisehat.jkt", label: "Instagram" },
      { url: "https://www.tiktok.com/@pastisehat.jkt", label: "Tiktok" },
      { url: "https://wa.me/+6285212775157", label: "WhatsApp" },
      { url: "#", label: "LinkedIn" },
      { url: "#", label: "Twitter/X" },
      { url: "#", label: "Youtube" },
    ],
  },
  {
    key: "guides",
    title: "Panduan",
    list: [
      { url: "/privacy-policy", label: "Kebijakan Privasi" },
      { url: "/terms-conditions", label: "Syarat dan Ketentuan" },
      { url: "/contact-us", label: "Hubungi Kami" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-orange pt-[150px]">
      <div className="relative mx-auto grid max-w-[1440px] grid-rows-[1fr_max-content] gap-32 px-6 lg:gap-64">
        <div className="z-20 flex flex-wrap items-start justify-between gap-32">
          <Image
            src="/img/logo.svg"
            alt="logo jps"
            width={500}
            height={300}
            className="h-auto w-[250px] brightness-[1000%]"
          />

          <div className="flex flex-wrap items-start gap-6 xs:gap-10 md:gap-16 xl:gap-20">
            {footerMenu.map((menu, index) => (
              <div key={index} className="grid gap-4">
                <h3 className="text-[22px] font-extrabold text-white">
                  {menu.title}
                </h3>

                <div className="grid gap-2">
                  {menu.list.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url as string}
                      className="w-max font-medium capitalize text-white/80 hover:text-green hover:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="z-20 flex h-24 flex-wrap items-center justify-center gap-2 border-t-2 border-white/20 sm:justify-between lg:border-none">
          <p className="text-sm font-medium capitalize text-white">
            &copy; {new Date().getFullYear()} Jakarta Pasti Sehat. All right
            reserved.
          </p>

          <p className="text-sm font-medium capitalize text-white">
            Part of{" "}
            <span className="font-black md:text-[20px] xl:text-[22px]">
              Pharma Metrocity Group
            </span>
          </p>
        </div>

        <Image
          src="/img/jkt-bg.svg"
          alt="jkt bg"
          width={1440}
          height={900}
          className="absolute bottom-24 left-0 z-10 hidden h-auto w-full opacity-10 lg:flex"
        />
      </div>
    </footer>
  );
}
