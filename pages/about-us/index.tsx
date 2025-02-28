import CardPrinciples from "@/components/card/CardPrinciples";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { IconContext, RocketLaunch, Target } from "@phosphor-icons/react";
import Image from "next/image";

const data = {
  vision: {
    title: "Visi",
    icon: RocketLaunch,
    text: "End-to-End Comprehensive Solution for the Health Sector in Jakarta.",
  },
  mission: {
    title: "Misi",
    icon: Target,
    list: [
      {
        key: 1,
        title: "Pendidikan",
        text: "Menyebarluaskan informasi kesehatan yang akurat dan mudah dipahami kepada masyarakat luas melalui berbagai media dan program.",
      },
      {
        key: 2,
        title: "Pemberdayaan",
        text: "Memfasilitasi masyarakat untuk berperan aktif dalam menjaga kesehatan diri dan lingkungan melalui pelatihan, workshop, dan kegiatan komunitas",
      },
      {
        key: 3,
        title: "Berkolaborasi",
        text: "Membangun jaringan kemitraan yang kuat dengan berbagai pemangku kepentingan untuk menciptakan sinergi dalam meningkatkan derajat kesehatan masyarakat.",
      },
      {
        key: 4,
        title: "Advokasi",
        text: "Memperjuangkan kebijakan publik yang berpihak pada kesehatan, serta memastikan aksesibilitas dan kualitas layanan kesehatan bagi seluruh lapisan masyarakat.",
      },
    ],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Tentang Kami">
        <section className="base pt-[160px]">
          <div className="wrapper lg:grid-cols-2 lg:items-start xl:gap-12">
            <div className="mt-4 grid gap-16 xl:mt-16">
              <div className="grid gap-4">
                <h1 className="title capitalize xl:text-[52px]">
                  Jakarta Pasti Sehat
                </h1>
                <p className="font-medium leading-[180%] text-gray">
                  Jakarta Pasti Sehat adalah sebuah komunitas yang diprakarsai
                  oleh mahasiswa Farmasi dan berfokus pada sektor kesehatan.
                  Komunitas ini bertujuan untuk meningkatkan derajat kesehatan
                  masyarakat, khususnya di wilayah Jakarta.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="h-[3px] w-[64px] border-t-3 border-orange" />
                <div className="size-3 rounded-full border-3 border-orange" />
                <div className="h-[3px] w-[64px] border-t-3 border-orange" />
              </div>

              <IconContext.Provider
                value={{
                  weight: "bold",
                  size: 48,
                  className: "text-orange",
                }}
              >
                <div className="grid gap-8">
                  <div className="grid gap-2">
                    <div className="inline-flex items-center gap-2">
                      <data.vision.icon />
                      <h2 className="title">{data.vision.title}</h2>
                    </div>

                    <p className="font-medium leading-[180%] text-gray">
                      {data.vision.text}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <div className="inline-flex items-center gap-2">
                      <data.mission.icon />
                      <h2 className="title">{data.mission.title}</h2>
                    </div>

                    <ul className="grid list-decimal gap-2 pl-4">
                      {data.mission.list.map((item) => (
                        <li
                          key={item.key}
                          className="font-extrabold leading-[180%]"
                        >
                          <span className="font-extrabold text-black">
                            {item.title}:
                          </span>{" "}
                          <span className="font-medium text-gray">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </IconContext.Provider>
            </div>

            <Image
              src="/img/about-img.png"
              alt="about img"
              width={900}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </section>

        <section className="base">
          <div className="wrapper lg:items-center">
            <h1 className="title px-8 text-center">
              Prinsip kami untuk jakarta pasti sehat
            </h1>

            <CardPrinciples />
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
