import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardPillarsPage() {
  return (
    <DashboardLayout title="pilar" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Pilar 📄"
            text="Lihat dan kelola semua pilar di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
