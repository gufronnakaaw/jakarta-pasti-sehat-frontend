import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardPotisionsPage() {
  return (
    <DashboardLayout title="pilar" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Posisi 📄"
            text="Lihat dan kelola semua posisi di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
