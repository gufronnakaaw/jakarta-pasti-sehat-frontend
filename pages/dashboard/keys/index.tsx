import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardKeysPage() {
  return (
    <DashboardLayout title="Kunci" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Kunci 🔑"
            text="Lihat dan kelola semua kunci di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
