import CardEvent from "@/components/card/CardEvent";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SelectFilterData from "@/components/SelectFilterData";
import Layout from "@/components/wrapper/Layout";

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

                <SelectFilterData />
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
