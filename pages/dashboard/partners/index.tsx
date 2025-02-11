import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardTeamsPage() {
  return (
    <DashboardLayout title="Mitra" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Mitra 🤝"
            text="Lihat dan kelola semua mitra di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
