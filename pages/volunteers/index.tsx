import CardVolunteer from "@/components/card/CardVolunteer";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import SelectFilterData from "@/components/SelectFilterData";
import Layout from "@/components/wrapper/Layout";

export default function VolunteersPage() {
  return (
    <>
      <Navbar />

      <Layout title="Volunteer">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">
                Jadi Relawan di Jakarta Pasti Sehat ✨
              </h1>
              <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                Sebagai relawan, kamu akan terlibat dalam berbagai kegiatan
                seru, mulai dari edukasi kesehatan, kampanye hidup sehat, hingga
                aksi sosial untuk membantu masyarakat yang membutuhkan.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SearchInput placeholder="Cari Posisi..." />

                <SelectFilterData />
              </div>

              <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-8">
                {Array.from({ length: 4 }, (_, index) => (
                  <CardVolunteer key={index} />
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
