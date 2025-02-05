import CardArticle from "@/components/card/CardArticle";
import CTAMain from "@/components/cta/CTAMain";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import SelectFilterData from "@/components/SelectFilterData";
import Layout from "@/components/wrapper/Layout";

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

                <SelectFilterData />
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
