import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardEventsPage() {
  return (
    <DashboardLayout title="Event" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Event 📅"
            text="Lihat dan kelola semua event di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
