import CardCareer from "@/components/card/CardCareer";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import SelectFilterData from "@/components/SelectFilterData";
import Layout from "@/components/wrapper/Layout";

export default function CareersPage() {
  return (
    <>
      <Navbar />

      <Layout title="Karir">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">
                Menjadi Bagian Dari Misi Kami 🚀
              </h1>
              <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                Kami mencari orang-orang yang bersemangat untuk bergabung dengan
                misi kami untuk memperkuat kesadaran kesehatan dan menjaga gaya
                hidup.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SearchInput placeholder="Cari Posisi (Contoh: Admin)..." />

                <SelectFilterData />
              </div>

              <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-8">
                {Array.from({ length: 4 }, (_, index) => (
                  <CardCareer key={index} />
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
