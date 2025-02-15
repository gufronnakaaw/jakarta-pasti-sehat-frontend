import EmptyData from "@/components/EmptyData";
import LoadingScreen from "@/components/loading/LoadingScreen";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Pillar } from "@/types/pillar";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Eye, PencilLine, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { Key, useCallback } from "react";
import useSWR from "swr";

export type PillarResponse = {
  pillars: Pillar[];
  page: number;
  total_pillars: number;
  total_pages: number;
};

export default function DashboardPillarsPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<PillarResponse>>({
    endpoint: "/pillars",
    method: "GET",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5NjE0MTE0LCJleHAiOjE3Mzk2MzU3MTR9.iNHp0306cpC9tu9laaypaw410WDuxqKwAc1ogH7QPG0",
    role: "admin",
  });

  const columnsPillar = [
    { name: "ID Pilar", uid: "pillar_id" },
    { name: "Nama Pilar", uid: "name" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellPillar = useCallback((pillar: Pillar, columnKey: Key) => {
    const cellValue = pillar[columnKey as keyof Pillar];

    switch (columnKey) {
      case "pillar_id":
        return (
          <div className="w-max font-medium text-black">{pillar.pillar_id}</div>
        );
      case "name":
        return (
          <div className="w-max font-medium text-black">{pillar.name}</div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(pillar.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="inline-flex w-max items-center gap-1">
            <Button isIconOnly variant="light" color="primary" size="sm">
              <Eye weight="bold" size={18} />
            </Button>

            <Button isIconOnly variant="light" color="primary" size="sm">
              <PencilLine weight="bold" size={18} />
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Pilar" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Pilar 📄"
            text="Lihat dan kelola semua pilar di sini"
          />

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <SearchInput placeholder="Cari Pillar..." />

              <Button
                color="primary"
                startContent={<Plus weight="bold" size={18} />}
                onPress={() => router.push("/dashboard/pillars/create")}
                className="font-bold"
              >
                Tambah Pillar
              </Button>
            </div>

            <div className="overflow-x-scroll scrollbar-hide">
              <Table
                isHeaderSticky
                aria-label="pillar table"
                color="primary"
                selectionMode="none"
                classNames={customStyleTable}
                className="scrollbar-hide"
              >
                <TableHeader columns={columnsPillar}>
                  {(column) => (
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                  )}
                </TableHeader>

                <TableBody
                  items={data?.data.pillars ?? []}
                  emptyContent={<EmptyData text="Pilar tidak ditemukan!" />}
                >
                  {(pillar: Pillar) => (
                    <TableRow key={pillar.pillar_id}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCellPillar(pillar, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div>pagination here</div>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
