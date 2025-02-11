import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardBannersPage() {
  return (
    <DashboardLayout title="Banner" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Banner 🖼️"
            text="Lihat dan kelola semua banner di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
