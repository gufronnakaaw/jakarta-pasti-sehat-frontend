import CardArticle from "@/components/card/CardArticle";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import Layout from "@/components/wrapper/Layout";
import { Select, SelectItem } from "@heroui/react";
import { Sliders } from "@phosphor-icons/react";

const filterEventData = [
  { key: "all", text: "Semua" },
  { key: "newest", text: "Terbaru" },
  { key: "oldest", text: "Terlama" },
];

export default function ArticlesPage() {
  return (
    <>
      <Navbar />

      <Layout title="Artikel">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-8 text-center lg:mb-16">
              Temukan Artikel Apapun Disini 📰
            </h1>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SearchInput placeholder="Cari Artikel..." />

                <Select
                  aria-label="filter event"
                  variant="flat"
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
                  <CardArticle key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="base">
          <CTAMain
            title={
              <>
                Dapatkan artikel terkini dari{" "}
                <br className="hidden lg:inline" />
                kami seputar kesehatan!
              </>
            }
          />
        </section>
      </Layout>

      <Footer />
    </>
  );
}
