import CardPartner from "@/components/card/CardPartner";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";

export default function PartnersPage() {
  return (
    <>
      <Navbar />

      <Layout title="Mitra Kami">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-4 text-center">Mitra Kami 🤝</h1>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(171px,1fr))] gap-8">
              {Array.from({ length: 14 }, (_, index) => (
                <CardPartner key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="base">
          <CTAMain
            title={
              <>
                Ayo menjadi bagian dari mitra kami!{" "}
                <br className="hidden lg:inline" />
                Bersama membangun Jakarta Pasti Sehat
              </>
            }
          />
        </section>
      </Layout>

      <Footer />
    </>
  );
}
