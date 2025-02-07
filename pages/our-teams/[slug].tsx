import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import {
  GraduationCap,
  IconContext,
  InstagramLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

export default function DetailsTeamPage() {
  return (
    <>
      <Navbar />

      <Layout title="Detail Tim">
        <ButtonBack />

        <section className="base pt-[80px]">
          <div className="grid w-full max-w-[600px] items-start gap-16 lg:max-w-none lg:grid-cols-[55%_1fr] lg:gap-24">
            <div className="mt-16 grid gap-32 md:mt-32 md:gap-64">
              <div className="grid gap-4">
                <h1 className="text-[38px] font-black leading-[110%] -tracking-[2px] text-black md:text-[48px]">
                  Nama Individual
                </h1>
                <p className="text-xl font-medium -tracking-[1px] text-orange">
                  Jabatan Individual
                </p>
              </div>

              <div className="grid gap-4">
                <h1 className="text-[28px] font-black leading-[110%] -tracking-[2px] text-black md:text-[32px]">
                  Deskripsi Singkat
                </h1>

                <div className="font-medium leading-[180%] text-gray">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  dignissimos debitis quas saepe quasi hic vel ducimus
                  temporibus, ullam odit, sit natus unde dolorum. Exercitationem
                  fuga voluptatibus explicabo natus molestiae.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
                  tempore impedit possimus saepe, quo mollitia? Aperiam tempore
                  dignissimos itaque accusantium aliquam voluptates quo, cumque
                  sit nemo, veritatis perferendis magni hic! Eius aspernatur
                  accusamus explicabo voluptatibus officiis! Officiis temporibus
                  odit, illo minima error iure amet numquam libero iusto soluta
                  optio, magni facilis atque corporis accusamus est doloremque
                  fuga, similique nisi modi sequi sit quisquam. Maiores vitae
                  recusandae nostrum assumenda, est quaerat obcaecati voluptates
                  saepe eligendi ab animi ipsum ipsa, sed repellendus.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio perferendis ipsam perspiciatis ipsa molestiae
                  laudantium facilis amet maxime nihil, optio sequi mollitia
                  natus hic libero illum maiores! Suscipit vitae maxime sed
                  earum aperiam. Nesciunt laudantium dolores vero quod, dicta
                  natus facere quasi asperiores doloribus vitae ratione dolore
                  hic necessitatibus optio voluptate ipsum. Sequi inventore eius
                  laboriosam ex. Totam, porro ipsum.
                </div>
              </div>
            </div>

            <div className="grid gap-12">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/img/testing/individual-img.png"
                  alt="thumbnail article"
                  width={800}
                  height={800}
                  className="aspect-square size-full scale-105 object-cover object-center"
                />

                {/* === overlay === */}
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
              </div>

              <IconContext.Provider
                value={{
                  weight: "bold",
                  size: 20,
                }}
              >
                <div className="grid gap-4">
                  <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black md:text-[32px]">
                    Riwayat Pendidikan
                  </h1>

                  <div className="grid gap-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 text-orange"
                      >
                        <GraduationCap />
                        <p className="font-medium capitalize">
                          S1 Universitas Indonesia
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black md:text-[32px]">
                    Sosial Media
                  </h1>

                  <div className="grid gap-2">
                    {Array.from({ length: 3 }, (_, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 text-orange"
                      >
                        <InstagramLogo />
                        <p className="font-medium capitalize">Instagram</p>
                      </div>
                    ))}
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
