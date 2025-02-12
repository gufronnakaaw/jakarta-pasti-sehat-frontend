import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import docImages from "@/data/doc-images.json";
import { Clock } from "@phosphor-icons/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function DocumentationDetailsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Detail Dokumentasi">
        <ButtonBack />

        <section className="base pt-[80px]">
          <div className={twMerge("wrapper", "lg:max-w-[900px]")}>
            <div className="grid gap-6">
              <div className="inline-flex items-center gap-2 text-orange">
                <p className="font-medium">Pilar 1</p>
                <div className="size-1.5 rounded-full bg-orange" />
                <p className="line-clamp-1 font-medium">
                  Penyakit Tidak Menular
                </p>
              </div>

              <h1 className="title">
                Ini adalah judul dari sebuah dokumentasi
              </h1>

              <div className="mt-2 inline-flex items-center gap-1 text-gray">
                <Clock weight="bold" size={18} />
                <p className="font-medium">Diupload pada: 5 Januari 2025</p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/img/testing/event-img.png"
                alt="thumbnail article"
                width={800}
                height={800}
                className="aspect-square size-full object-cover object-center"
              />

              {/* === overlay === */}
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
            </div>

            <div className="flex items-center justify-center pt-4">
              <div className="h-[3px] w-[64px] border-t-3 border-orange" />
              <div className="size-3 rounded-full border-3 border-orange" />
              <div className="h-[3px] w-[64px] border-t-3 border-orange" />
            </div>
          </div>
        </section>

        <section className="base">
          <div className="w-full max-w-[600px] columns-[200px] lg:max-w-none xl:columns-[300px]">
            {docImages.doc_images.map((item, index) => (
              <div
                key={index}
                className="relative mb-4 overflow-hidden rounded-2xl"
              >
                <Image
                  priority
                  src={item.url as string}
                  alt={item.alt}
                  width={500}
                  height={500}
                  className="h-auto w-full"
                />

                {/* === overlay === */}
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
              </div>
            ))}
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
