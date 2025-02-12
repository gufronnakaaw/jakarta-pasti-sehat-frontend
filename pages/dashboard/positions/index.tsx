import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardPotisionsPage() {
  return (
    <DashboardLayout title="Posisi" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Jabatan 📄"
            text="Lihat dan kelola semua jabatan di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
