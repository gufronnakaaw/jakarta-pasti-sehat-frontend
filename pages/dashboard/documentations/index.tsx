import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardEventsPage() {
  return (
    <DashboardLayout title="Dokumentasi" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Dokumentasi 📷"
            text="Lihat dan kelola semua dokumentasi di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
