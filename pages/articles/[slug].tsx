import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { CalendarMinus, Clock } from "@phosphor-icons/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ArticleDetailsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Detail Artikel">
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

              <div className="grid gap-2">
                <h1 className="text-[32px] font-black leading-[120%] text-black lg:text-[42px]">
                  Ini adalah judul dari sebuah artikel yang ditulis
                </h1>
                <p className="font-medium leading-[180%] text-gray">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
                  doloribus nesciunt laborum quis natus consequuntur? Rem autem
                  beatae quia.
                </p>
              </div>

              <div className="mt-2 inline-flex items-center gap-6 text-gray">
                <div className="inline-flex items-center gap-1">
                  <CalendarMinus weight="bold" size={18} />
                  <p className="font-medium">5 Januari 2025</p>
                </div>

                <div className="inline-flex items-center gap-1">
                  <Clock weight="bold" size={18} />
                  <p className="font-medium">5 Menit Waktu Baca</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/img/testing/testing-img.png"
                alt="thumbnail article"
                width={800}
                height={800}
                className="aspect-square size-full object-cover object-center"
              />

              {/* === overlay === */}
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="h-[3px] w-[64px] border-t-3 border-orange" />
              <div className="size-3 rounded-full border-3 border-orange" />
              <div className="h-[3px] w-[64px] border-t-3 border-orange" />
            </div>

            <p className="font-medium leading-[180%] text-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab non
              labore commodi. Veniam facere porro sint! Praesentium ea harum,
              eius quam ipsum ex minima amet voluptatum sapiente, nesciunt iusto
              vero 🔫
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              quasi quibusdam ab exercitationem assumenda inventore impedit qui
              dolorum velit, odio natus esse. Exercitationem obcaecati similique
              nobis architecto animi delectus molestias voluptates quaerat
              nostrum porro et dolor aliquam praesentium saepe, minus expedita
              sit? Distinctio sed, fugit dignissimos accusantium debitis illo
              facere! 😱
              <br />
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
              aperiam magnam neque necessitatibus, in, debitis reiciendis, quis
              beatae nisi amet repellendus alias? Consectetur esse, ipsa sint,
              odio temporibus soluta deserunt consequatur doloribus ex velit
              facere distinctio ullam sunt delectus, non architecto error
              facilis. Dolore libero assumenda, earum maxime fugit reprehenderit
              perspiciatis ex tempora, corporis esse labore quia enim nisi
              autem. 🦅
            </p>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
