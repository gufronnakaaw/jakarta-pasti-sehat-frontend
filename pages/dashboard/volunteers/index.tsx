import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardVolunteersPage() {
  return (
    <DashboardLayout title="Volunteer" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Volunteer 🧡"
            text="Lihat dan kelola semua volunteer di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
