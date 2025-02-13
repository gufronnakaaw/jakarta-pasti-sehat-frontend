import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import useSWR from "swr";

export default function DashboardPillarsPage() {
  const { data, isLoading } = useSWR({
    endpoint: "/pillars",
    method: "GET",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
  });

  console.log(data);

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Pilar" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Pilar 📄"
            text="Lihat dan kelola semua pilar di sini"
          />
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
