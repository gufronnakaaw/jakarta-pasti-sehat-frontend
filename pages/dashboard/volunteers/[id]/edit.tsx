import ButtonBack from "@/components/button/ButtonBack";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function EditVolunteerPage() {
  return (
    <DashboardLayout title="Edit Volunteer">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Volunteer 🧡"
            text="Edit dan kelola data volunteer dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
