import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";

export default function DashboardArticlesPage() {
  return (
    <DashboardLayout title="Artikel" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Artikel 📰"
            text="Lihat dan kelola semua artikel di sini"
          />

          <div>table here</div>

          <div>pagination here</div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
