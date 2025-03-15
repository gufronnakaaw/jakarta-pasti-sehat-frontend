import ButtonBack from "@/components/button/ButtonBack";
import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import {
  VolunteerApplicant,
  VolunteerDashboardDetails,
} from "@/types/volunteer";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate, formatDateWithoutTime } from "@/utils/formatDate";
import { getPillarName, getSubPillarName } from "@/utils/pillar";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  ArrowSquareOut,
  Clock,
  DownloadSimple,
  Eye,
  IconContext,
} from "@phosphor-icons/react";
import parse from "html-react-parser";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Key, useCallback, useState } from "react";
import useSWR from "swr";
import { twMerge } from "tailwind-merge";

export default function DetailsVolunteerPage({
  params,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, error } = useSWR<
    SuccessResponse<VolunteerDashboardDetails>
  >({
    endpoint: `/volunteers/${params?.id as string}`,
    method: "GET",
    role: "admin",
    token,
  });
  const [isOpenDetailsApplicant, setIsOpenDetailsApplicant] =
    useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<VolunteerApplicant | null>(null);

  const columnsVolunteerApplicant = [
    { name: "ID Pelamar", uid: "vol_appl_id" },
    { name: "Nama Pelamar", uid: "fullname" },
    { name: "Email", uid: "email" },
    { name: "Asal Kampus", uid: "institution" },
    { name: "Diunggah Pada", uid: "uploaded_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellVolunteerApplicant = useCallback(
    (volappl: VolunteerApplicant, columnKey: Key) => {
      const cellValue = volappl[columnKey as keyof VolunteerApplicant];

      switch (columnKey) {
        case "vol_appl_id":
          return (
            <div className="w-max font-medium text-black">
              {volappl.vol_appl_id}
            </div>
          );
        case "fullname":
          return (
            <div className="w-max font-medium text-black">
              {volappl.fullname}
            </div>
          );
        case "email":
          return (
            <div className="w-max font-medium text-black">{volappl.email}</div>
          );
        case "institution":
          return (
            <div className="w-max font-medium text-black">
              {volappl.institution}
            </div>
          );
        case "uploaded_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(volappl.uploaded_at)}
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
              <Button
                size="sm"
                color="primary"
                variant="light"
                startContent={<Eye className="text-orange" />}
                onPress={() => handleOpenDetailsApplicant(volappl)}
                className="font-bold"
              >
                Detail
              </Button>
            </IconContext.Provider>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  function handleOpenDetailsApplicant(prepClass: VolunteerApplicant) {
    setSelectedApplicant(prepClass);
    setIsOpenDetailsApplicant(true);
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Detail Volunteer">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Detail Volunteer 🧡"
            text="Lihat detail data volunteer di sini"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <>
              <div className="grid gap-2">
                <div className="inline-flex items-center gap-2 text-orange">
                  <p className="font-medium">
                    {getPillarName(data?.data.pillar)}
                  </p>
                  <div className="size-1.5 rounded-full bg-orange" />
                  <p className="line-clamp-1 font-medium">
                    {getSubPillarName(data?.data.subpillar)}
                  </p>
                </div>

                <h1 className={twMerge("title", "sm:text-[36px]")}>
                  {data?.data.title}
                </h1>

                <div className="mt-3 inline-flex items-center gap-1 text-sm text-gray">
                  <Clock weight="bold" size={16} />
                  <p className="font-medium">
                    Dibuat pada:{" "}
                    {formatDateWithoutTime(data?.data.created_at as string)}
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <h2
                  className={twMerge(
                    "title",
                    "sm:text-[24px] sm:-tracking-[1px]",
                  )}
                >
                  Persyaratan
                </h2>

                <div className="preventive-list preventive-table list-outside font-medium leading-[180%] text-gray">
                  {parse(data?.data.requirements as string)}
                </div>
              </div>

              <div className="grid gap-2">
                <h2
                  className={twMerge(
                    "title",
                    "sm:text-[24px] sm:-tracking-[1px]",
                  )}
                >
                  Tanggung Jawab
                </h2>

                <div className="preventive-list preventive-table list-outside font-medium leading-[180%] text-gray">
                  {data?.data.responsibilities === null
                    ? "-"
                    : parse(data?.data.responsibilities as string)}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-end justify-between gap-4">
                  <h2
                    className={twMerge(
                      "title",
                      "sm:text-[24px] sm:-tracking-[1px]",
                    )}
                  >
                    Daftar Pelamar 🧑🏻‍🤝‍🧑🏻
                  </h2>

                  <p className="font-medium leading-[180%] text-gray">
                    Total Pelamar:{" "}
                    <span className="font-black text-orange">
                      {data?.data.volappls.length}
                    </span>
                  </p>
                </div>

                <div className="mt-2 overflow-x-scroll scrollbar-hide">
                  <Table
                    isStriped
                    aria-label="volunteer table"
                    color="primary"
                    selectionMode="none"
                    classNames={customStyleTable}
                    className="scrollbar-hide"
                  >
                    <TableHeader columns={columnsVolunteerApplicant}>
                      {(column) => (
                        <TableColumn key={column.uid}>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>

                    <TableBody
                      items={data?.data.volappls}
                      emptyContent={
                        <EmptyData text="Pelamar tidak ditemukan!" />
                      }
                    >
                      {(volappl: VolunteerApplicant) => (
                        <TableRow key={volappl.vol_appl_id}>
                          {(columnKey) => (
                            <TableCell>
                              {renderCellVolunteerApplicant(volappl, columnKey)}
                            </TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <Modal
                  isDismissable={false}
                  size="xl"
                  scrollBehavior="inside"
                  placement="center"
                  isOpen={isOpenDetailsApplicant}
                  onOpenChange={(open) => setIsOpenDetailsApplicant(open)}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="font-extrabold text-black">
                          Detail Pelamar
                        </ModalHeader>

                        <ModalBody>
                          <div className="grid gap-8">
                            <div className="grid gap-1">
                              {[
                                [
                                  "Nama Lengkap",
                                  `${selectedApplicant?.fullname}`,
                                ],
                                ["Email", `${selectedApplicant?.email}`],
                                [
                                  "Asal Kampus",
                                  `${selectedApplicant?.institution}`,
                                ],
                                ["Tingkatan", `${selectedApplicant?.level}`],
                                [
                                  "Jurusan",
                                  `${selectedApplicant?.study_program}`,
                                ],
                                [
                                  "CV / Resume",
                                  <Link
                                    key="cv"
                                    isExternal
                                    showAnchorIcon
                                    href={selectedApplicant?.cv_url as string}
                                    anchorIcon={
                                      <DownloadSimple
                                        weight="bold"
                                        size={16}
                                        className="ml-1"
                                      />
                                    }
                                    className="text-sm font-bold text-orange hover:underline"
                                  >
                                    Download CV
                                  </Link>,
                                ],
                                [
                                  "Bukti Follow",
                                  <Link
                                    key="proof"
                                    isExternal
                                    showAnchorIcon
                                    href="#"
                                    onPress={() =>
                                      window.open(
                                        selectedApplicant?.follow_url as string,
                                        "_blank",
                                      )
                                    }
                                    anchorIcon={
                                      <ArrowSquareOut
                                        weight="bold"
                                        size={16}
                                        className="ml-1"
                                      />
                                    }
                                    className="text-sm font-bold text-orange hover:underline"
                                  >
                                    Lihat Bukti
                                  </Link>,
                                ],
                                [
                                  "Diunggah Pada",
                                  `${formatDate(selectedApplicant?.uploaded_at as string)}`,
                                ],
                              ].map(([label, value], index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-[120px_2px_1fr] gap-4 text-sm font-medium text-black"
                                >
                                  <p>{label}</p>
                                  <span>:</span>
                                  <p className="font-bold">{value}</p>
                                </div>
                              ))}
                            </div>

                            <div className="grid gap-1">
                              <h4 className="font-extrabold text-black">
                                Alasan Join:
                              </h4>

                              <p className="font-medium text-gray">
                                {selectedApplicant?.reason}
                              </p>
                            </div>
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                            className="font-bold"
                          >
                            Tutup
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  params: ParsedUrlQuery;
  token: string;
}> = async ({ params, req }) => {
  return {
    props: {
      params: params as ParsedUrlQuery,
      token: req.headers["access_token"] as string,
    },
  };
};
