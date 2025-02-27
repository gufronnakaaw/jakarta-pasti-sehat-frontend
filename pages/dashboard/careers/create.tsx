import ButtonBack from "@/components/button/ButtonBack";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function CreateCareerPage() {
  return (
    <DashboardLayout title="Buat Karir">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Karir 🧳"
            text="Buat dan kelola data karir dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
