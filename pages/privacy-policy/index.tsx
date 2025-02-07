import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import privacyPolicyData from "@/data/privacy-policy.json";
import { PrivacyPolicy } from "@/types/privacypage";

const privacyPolicy: PrivacyPolicy = privacyPolicyData;

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <Layout title="Kebijakan Privasi">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-8 text-center">{privacyPolicy.title} 🔒</h1>

            {privacyPolicy.sections.map((section, index) => (
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
