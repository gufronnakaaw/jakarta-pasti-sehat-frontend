import CardTeam from "@/components/card/CardTeam";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";

export default function OurTeamsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Tim Kami">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">Tim Terbaik Kami 🧡</h1>
              <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                Tim kami terdiri dari individu yang berdedikasi, berkomitmen,
                dan peduli terhadap kesehatan warga Jakarta. Kami bekerja
                bersama membuat perubahan nyata yang positif untuk semua.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 8 }, (_, index) => (
                <CardTeam key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="base">
          <CTAMain
            title={
              <>
                Anda ingin menjadi bagian dari{" "}
                <br className="hidden lg:inline" />
                keluarga Jakarta Pasti Sehat?
              </>
            }
          />
        </section>
      </Layout>

      <Footer />
    </>
  );
}
