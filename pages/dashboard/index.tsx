import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" className="scrollbar-hide">
      <DashboardContainer>
        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-4">
            <TitleText
              title="Selamat Datang 👋"
              text={
                <>
                  Berikut rangkuman web{" "}
                  <Link
                    href="https://jakartapastisehat.com"
                    target="_blank"
                    className="font-bold text-orange hover:underline"
                  >
                    jakartapastisehat.com
                  </Link>
                </>
              }
            />

            <span className="text-sm font-bold text-black">
              ⏰ Rabu, 5 Februari 2025 11:39
            </span>
          </div>

          <div>rangkuman data</div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
