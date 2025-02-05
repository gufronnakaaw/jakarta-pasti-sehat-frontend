import CardEvent from "@/components/card/CardEvent";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Select, SelectItem } from "@heroui/react";
import { Sliders } from "@phosphor-icons/react";

const filterEventData = [
  { key: "all", text: "Semua" },
  { key: "newest", text: "Terbaru" },
  { key: "oldest", text: "Terlama" },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Event Kami">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-8 text-center lg:mb-16">Event Kami 🎉</h1>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-[24px] font-black leading-[110%] -tracking-[1px] text-black lg:text-[28px]">
                  Daftar Event
                </h2>

                <Select
                  aria-label="filter event"
                  variant="bordered"
                  placeholder="Filter"
                  labelPlacement="outside"
                  defaultSelectedKeys={["all"]}
                  startContent={
                    <Sliders weight="bold" size={18} className="text-black" />
                  }
                  listboxProps={{
                    itemClasses: {
                      title: "font-semibold text-black",
                    },
                  }}
                  classNames={{
                    base: "w-[180px]",
                    value: "font-semibold text-black",
                  }}
                >
                  {filterEventData.map((item) => (
                    <SelectItem key={item.key}>{item.text}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                {Array.from({ length: 4 }, (_, index) => (
                  <CardEvent key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
