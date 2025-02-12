import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardAminssPage() {
  return (
    <DashboardLayout title="Admin" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Admin 🧑"
            text="Lihat dan kelola semua admin di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
