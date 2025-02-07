import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import termsConditionsData from "@/data/terms-and-conditions.json";
import { TermsAndConditions } from "@/types/termspage";

const termsConditions: TermsAndConditions = termsConditionsData;

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />

      <Layout title="Syarat dan Ketentuan">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-8 text-center">
              {termsConditions.title} 📑
            </h1>

            {termsConditions.sections.map((section, index) => (
              <div key={index} className="grid gap-2">
                <h2 className="text-xl font-bold text-black">
                  {section.title}
                </h2>

                {Array.isArray(section.content) ? (
                  <ul className="list-outside list-disc pl-10 font-medium leading-[180%] text-gray">
                    {section.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-medium leading-[180%] text-gray">
                    {Array.isArray(section.content)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
