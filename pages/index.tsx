import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <section className="h-[calc(100vh-6rem)] w-full bg-green-200">
        landing hero
      </section>

      <Layout title="Komunitas Kesehatan Yang Berkomitmen Untuk Memperkuat Kesadaran Gaya Hidup Sehat Masyarakat">
        <section className="h-screen bg-red-200">content 1</section>

        <section className="h-screen bg-lime-200">content 2</section>

        <section className="h-screen bg-zinc-200">content 3</section>
      </Layout>

      <footer className="bg-orange h-[625px] w-full">footer</footer>
    </>
  );
}
