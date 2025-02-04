import Image from "next/image";
import Link from "next/link";

const footerMenu = [
  {
    key: "about",
    title: "Tentang Kami",
    list: [
      { url: "/company/about-us", label: "Tentang Kami" },
      { url: "/company/careers", label: "karir" },
      { url: "/company/our-teams", label: "Tim Kami" },
    ],
  },
  {
    key: "navigation",
    title: "Pintasan",
    list: [
      { url: "/documentations", label: "Dokumentasi" },
      { url: "#", label: "Donasi" },
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
      { url: "https://wa.me/085212775157", label: "WhatsApp" },
      { url: "#", label: "LinkedIn" },
      { url: "#", label: "Twitter/X" },
      { url: "#", label: "Youtube" },
    ],
  },
  {
    key: "guides",
    title: "Panduan",
    list: [
      { url: "/company/privacy-policy", label: "Kebijakan Privasi" },
      { url: "/company/terms-conditions", label: "Syarat dan Ketentuan" },
      { url: "/company/contact-us", label: "Hubungi Kami" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-orange pt-[150px]">
      <div className="mx-auto grid max-w-[1440px] grid-rows-[1fr_max-content] gap-48 px-6">
        <div className="flex flex-wrap items-start justify-between gap-32">
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
                  {menu.list.map((item) => (
                    <Link
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

        <div className="flex flex-wrap items-center justify-center gap-2 border-t-2 border-white/20 py-8 sm:justify-between">
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
      </div>
    </footer>
  );
}
