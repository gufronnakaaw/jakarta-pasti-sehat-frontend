import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardCareersPage() {
  return (
    <DashboardLayout title="Karir" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Karir 🧳"
            text="Lihat dan kelola semua karir di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
