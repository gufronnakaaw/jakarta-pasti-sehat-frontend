import EmptyData from "@/components/EmptyData";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Partner } from "@/types/partner";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
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
import { IconContext, PencilLine, Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export type PartnerResponse = {
  partners: Partner[];
  page: number;
  total_partners: number;
  total_pages: number;
};

export default function DashboardTeamsPage() {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, mutate } = useSWR<SuccessResponse<PartnerResponse>>({
    endpoint: "/partners",
    method: "GET",
    token: token,
    role: "admin",
  });

  const columnsPartner = [
    { name: "Preview Logo", uid: "image_url" },
    { name: "Nama Logo", uid: "alt" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellPartner = useCallback((partner: Partner, columnKey: Key) => {
    const cellValue = partner[columnKey as keyof Partner];

    switch (columnKey) {
      case "image_url":
        return (
          <div className="flex size-[80px] w-max items-center overflow-hidden font-medium text-black">
            <Image
              src={partner.image_url}
              alt={partner.alt}
              width={150}
              height={150}
              className="h-auto w-[80px]"
            />
          </div>
        );
      case "alt":
        return (
          <div className="w-max font-medium capitalize text-black">
            {partner.alt}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(partner.created_at)}
          </div>
        );
      case "action":
        return (
          <IconContext.Provider
            value={{
              weight: "bold",
              size: 18,
              className: "text-gray",
            }}
          >
            <div className="inline-flex w-max items-center gap-1">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() =>
                  router.push(
                    `/dashboard/partners/${encodeURIComponent(partner.partner_id)}/edit`,
                  )
                }
              >
                <PencilLine />
              </Button>

              <ModalConfirmDelete
                trigger={
                  <Button isIconOnly variant="light" size="sm" color="danger">
                    <Trash className="text-danger" />
                  </Button>
                }
                footer={() => (
                  <Button
                    color="danger"
                    className="px-6 font-bold"
                    onPress={() => handleDeletePartner(partner.partner_id)}
                  >
                    Ya, Hapus
                  </Button>
                )}
              />
            </div>
          </IconContext.Provider>
        );

      default:
        return cellValue;
    }
  }, []);

  async function handleDeletePartner(partner_id: string) {
    try {
      await fetcher({
        endpoint: `/partners/${partner_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Mitra berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus mitra");
    }
  }

  const filteredPartner = data?.data.partners.filter((partner) =>
    [partner.alt, partner.partner_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Mitra" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Mitra 🤝"
            text="Lihat dan kelola semua mitra di sini"
          />

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <SearchInput
                placeholder="Cari Mitra..."
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />

              <Button
                color="primary"
                startContent={<Plus weight="bold" size={18} />}
                onPress={() => router.push("/dashboard/partners/create")}
                className="font-bold"
              >
                Tambah Mitra
              </Button>
            </div>

            <div className="overflow-x-scroll scrollbar-hide">
              <Table
                isStriped
                aria-label="partners table"
                color="primary"
                selectionMode="none"
                classNames={customStyleTable}
                className="scrollbar-hide"
              >
                <TableHeader columns={columnsPartner}>
                  {(column) => (
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                  )}
                </TableHeader>

                <TableBody
                  items={filteredPartner ?? []}
                  emptyContent={<EmptyData text="Mitra tidak ditemukan!" />}
                >
                  {(partner: Partner) => (
                    <TableRow key={partner.partner_id}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCellPartner(partner, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
