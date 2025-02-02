import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Tentang Kami">
        <section className="h-[750px] pt-24">about us</section>

        <section>our principle</section>
      </Layout>

      <Footer />
    </>
  );
}
