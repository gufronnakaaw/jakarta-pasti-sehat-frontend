import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@heroui/react";
import {
  CalendarMinus,
  Clock,
  IconContext,
  InstagramLogo,
  MapPin,
  ShareNetwork,
  TwitterLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EventDetailsPage() {
  async function handleShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link berhasil disalin!");
    } catch (err) {
      console.error("Gagal menyalin link", err);
      toast.error("Oppss, link gagal disalin");
    }
  }

  function handleShareInstagram() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.instagram.com/stories/create/?url=${url}`,
      "_blank",
    );
  }

  function handleShareTwitter() {
    const text = encodeURIComponent("Cek event keren ini!");
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  }

  return (
    <>
      <Navbar />

      <Layout title="Detail Event">
        <ButtonBack />

        <section className="base pt-[80px]">
          <div className="grid w-full max-w-[600px] items-start gap-6 lg:max-w-none lg:grid-cols-[55%_1fr] lg:gap-12 xl:gap-16">
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

            <div className="grid gap-8 lg:sticky lg:right-0 lg:top-[8rem]">
              <div className="grid gap-6 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
                <h1 className="text-[26px] font-black capitalize leading-[120%] -tracking-wide text-black">
                  Ini adalah judul dari event yang diselenggarakan
                </h1>

                <IconContext.Provider
                  value={{
                    weight: "bold",
                    size: 20,
                    className: "text-orange",
                  }}
                >
                  <div className="grid gap-2 text-gray">
                    {[
                      [<CalendarMinus />, "5 - 6 Februari 2025"],
                      [<Clock />, "10:00 WIB - Selesai"],
                      [
                        <MapPin />,
                        "Taman Ismail Marzuki - Jl. Cikini Raya no. 73, RT.8/RW.2, Cikini, Kec. Menteng, Jakarta, Indonesia 10330.",
                      ],
                    ].map(([icon, label], index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2"
                      >
                        {icon}
                        <p className="flex-1 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                </IconContext.Provider>

                <div className="mt-6 flex h-[40px] items-center justify-center rounded-xl border-2 border-gray/20 text-sm font-bold">
                  Event Gratis 🎉🎉
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
                <h2 className="text-[20px] font-bold -tracking-[1px] text-black">
                  Bagikan Event
                </h2>

                <IconContext.Provider
                  value={{
                    weight: "bold",
                    size: 20,
                    className: "text-black",
                  }}
                >
                  <div className="inline-flex items-center gap-4">
                    <Button
                      isIconOnly
                      aria-label="Share Link"
                      variant="bordered"
                      radius="full"
                      onPress={handleShareLink}
                    >
                      <ShareNetwork />
                    </Button>

                    <Button
                      isIconOnly
                      aria-label="Share Instagram"
                      variant="bordered"
                      radius="full"
                      onPress={handleShareInstagram}
                    >
                      <InstagramLogo />
                    </Button>

                    <Button
                      isIconOnly
                      aria-label="Share Twitter"
                      variant="bordered"
                      radius="full"
                      onPress={handleShareTwitter}
                    >
                      <TwitterLogo />
                    </Button>
                  </div>
                </IconContext.Provider>
              </div>
            </div>

            <p className="mt-6 font-medium leading-[180%] text-gray lg:mt-0">
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
