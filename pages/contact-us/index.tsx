import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import {
  Envelope,
  IconContext,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

const data = [
  { url: "mailto:jktpastisehat@gmail.com", label: "Email", icon: Envelope },
  {
    url: "https://instagram.com/pastisehat.jkt",
    label: "Instagram",
    icon: InstagramLogo,
  },
  {
    url: "https://www.tiktok.com/@pastisehat.jkt",
    label: "Tiktok",
    icon: TiktokLogo,
  },
  {
    url: "https://wa.me/+6285212775157",
    label: "WhatsApp",
    icon: WhatsappLogo,
  },
];

export default function ContactUsPage() {
  return (
    <>
      <Navbar />

      <Layout
        title="Kontak Kami"
        description="Kami selalu terbuka untuk berdiskusi dan bersama-sama membangun komunitas kesehatan yang lebih baik untuk warga Jakarta."
      >
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">Kontak Kami 📞</h1>
              <p className="max-w-[900px] font-medium leading-[180%] text-gray">
                Punya pertanyaan, saran, atau ingin berkolaborasi dengan Jakarta
                Pasti Sehat? Jangan ragu untuk menghubungi kami! Kami selalu
                terbuka untuk berdiskusi dan bersama-sama membangun komunitas
                kesehatan yang lebih baik untuk warga Jakarta.
              </p>
            </div>

            <IconContext.Provider
              value={{
                weight: "bold",
                size: 32,
                className: "text-orange",
              }}
            >
              <div className="grid items-center gap-4 lg:flex lg:justify-self-center">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)] xl:w-[250px]"
                  >
                    <item.icon />

                    <Link
                      href={item.url}
                      target="_blank"
                      className="text-lg font-bold text-black hover:text-orange hover:underline"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </IconContext.Provider>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
