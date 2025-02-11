import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardTeamsPage() {
  return (
    <DashboardLayout title="Tim" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Tim 👥"
            text="Lihat dan kelola semua tim di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
