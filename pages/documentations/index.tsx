import CardDocumentation from "@/components/card/CardDocumentation";
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

export default function DocumentationsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Dokumentasi">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-2 text-center">
              <h1 className="title text-center">Dokumentasi 📷</h1>
              <p className="max-w-[900px] font-medium leading-[180%] text-gray">
                Kami membagikan dokumentasi lengkap dari beberapa kegiatan yang
                telah kami lakukan. Temukan informasi mengenai acara, inisiatif,
                dan program yang bertujuan untuk meningkatkan kesehatan
                masyarakat Jakarta.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-[24px] font-black leading-[110%] -tracking-[1px] text-black lg:text-[28px]">
                  Daftar Gambar
                </h2>

                <Select
                  aria-label="filter photo"
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
                  <CardDocumentation key={index} />
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
