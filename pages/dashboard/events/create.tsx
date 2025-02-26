import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import { InputImage } from "@/components/InputImage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Pillar, PillarDetails } from "@/types/pillar";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

type InputState = {
  title: string;
  detail: string;
  start: string;
  end: string;
  type: string;
  location: string;
};

export default function CreateEventPage({
  error,
  pillars,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [input, setInput] = useState<InputState>({
    title: "",
    detail: "",
    start: "",
    end: "",
    type: "",
    location: "",
  });
  const [pillar, setPillar] = useState<string>("");

  const [subpillar, setSubpillar] = useState<string>("");
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);

  const [selectedPillar, setSelectedPillar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>();
  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  async function handleCreateEvent() {
    setIsLoading(true);

    try {
      const formData = new FormData();

      const croppedImage = await getCroppedImg(fileImage, croppedAreaPixels);
      const response = await fetch(croppedImage as string);
      const blob = await response.blob();
      const fileConvert = new File([blob], "event-img.jpg", {
        type: "image/jpg",
      });

      formData.append("events", fileConvert);
      formData.append("title", input.title);
      formData.append("detail", input.detail);
      formData.append("start", input.start);
      formData.append("end", input.end);
      formData.append("type", input.type);
      formData.append("location", input.location);
      formData.append("by", "Super Admin");

      if (selectedPillar) {
        formData.append("pillar_id", pillar);
        formData.append("sub_pillar_id", subpillar);
      }

      await fetcher({
        endpoint: "/events",
        method: "POST",
        data: formData,
        token,
      });

      router.back();
      toast.success("Event berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal menambahkan event");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Event">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Event 📅"
            text="Buat dan kelola event terbaru"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid max-w-[900px] gap-8">
              <div className="grid grid-cols-[300px_1fr] items-start gap-8">
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <div className="aspect-video size-[300px] rounded-xl border-2 border-dashed border-gray/20 p-1">
                      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-gray/20">
                        <Cropper
                          image={fileImage as string}
                          crop={cropImage}
                          zoom={zoomImage}
                          aspect={1 / 1}
                          onCropChange={setCropImage}
                          onCropComplete={onCropComplete({
                            setCroppedAreaPixels,
                          })}
                          onZoomChange={setZoomImage}
                        />
                      </div>
                    </div>

                    <p className="text-center text-sm font-medium leading-[170%] text-gray">
                      <strong className="mr-1 text-danger">*</strong>ratio
                      gambar 1:1
                    </p>
                  </div>

                  <InputImage {...{ setFileImage }} />
                </div>

                <div className="grid gap-4">
                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Nama Event"
                    labelPlacement="outside"
                    placeholder="Contoh: Event Jakarta Pasti Sehat"
                    name="title"
                    value={input.title}
                    onChange={(e) =>
                      setInput({ ...input, title: e.target.value })
                    }
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <Switch
                    color="primary"
                    isSelected={selectedPillar}
                    onValueChange={setSelectedPillar}
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                  >
                    Aktifkan Pilar
                  </Switch>

                  {selectedPillar ? (
                    <>
                      <Select
                        isRequired
                        aria-label="select pillar"
                        variant="flat"
                        label="Pilih Pilar"
                        labelPlacement="outside"
                        placeholder="Contoh: Pilar 1"
                        name="pillar"
                        items={pillars}
                        selectedKeys={[pillar]}
                        onChange={(e) => setPillar(e.target.value)}
                        classNames={{
                          trigger: "bg-white",
                          value: "font-semibold text-gray",
                        }}
                      >
                        {(pillar: Pillar) => (
                          <SelectItem key={pillar.pillar_id}>
                            {pillar.name}
                          </SelectItem>
                        )}
                      </Select>

                      {pillar ? (
                        <Select
                          isRequired
                          aria-label="select subpillar"
                          variant="flat"
                          label="Pilih Subpilar"
                          labelPlacement="outside"
                          placeholder="Contoh: Hepatitis"
                          name="subpillar"
                          items={subPillars?.subpillars}
                          selectedKeys={[subpillar]}
                          onChange={(e) => setSubpillar(e.target.value)}
                          classNames={{
                            trigger: "bg-white",
                            value: "font-semibold text-gray",
                          }}
                        >
                          {(subpillar: {
                            name: string;
                            sub_pillar_id: string;
                          }) => (
                            <SelectItem key={subpillar.sub_pillar_id}>
                              {subpillar.name}
                            </SelectItem>
                          )}
                        </Select>
                      ) : null}
                    </>
                  ) : null}

                  <Select
                    isRequired
                    aria-label="select type"
                    variant="flat"
                    label="Tipe Event"
                    labelPlacement="outside"
                    placeholder="Contoh: Gratis"
                    name="type"
                    selectedKeys={[input.type]}
                    onChange={(e) =>
                      setInput({ ...input, type: e.target.value })
                    }
                    classNames={{
                      trigger: "bg-white",
                      value: "font-semibold text-gray",
                    }}
                  >
                    <SelectItem key="free">Gratis</SelectItem>
                    <SelectItem key="paid">Berbayar</SelectItem>
                  </Select>

                  <div className="grid grid-cols-2 items-center gap-4">
                    <DatePicker
                      isRequired
                      showMonthAndYearPickers
                      hideTimeZone={true}
                      variant="flat"
                      label="Tanggal Mulai"
                      labelPlacement="outside"
                      selectorIcon={<CalendarDots weight="bold" size={18} />}
                      hourCycle={24}
                      onChange={(date) => {
                        if (date) {
                          const now = new Date(date);
                          now.setHours(0, 0, 0, 0);

                          setInput({
                            ...input,
                            start: now.toISOString(),
                          });
                        }
                      }}
                      dateInputClassNames={{
                        ...customStyleInput,
                        inputWrapper: "bg-white",
                      }}
                    />

                    <DatePicker
                      isRequired
                      showMonthAndYearPickers
                      hideTimeZone={true}
                      variant="flat"
                      label="Tanggal Selesai"
                      labelPlacement="outside"
                      selectorIcon={<CalendarDots weight="bold" size={18} />}
                      hourCycle={24}
                      onChange={(date) => {
                        if (date) {
                          const now = new Date(date);
                          now.setHours(23, 59, 59, 999);

                          setInput({
                            ...input,
                            end: now.toISOString(),
                          });
                        }
                      }}
                      dateInputClassNames={{
                        ...customStyleInput,
                        inputWrapper: "bg-white",
                      }}
                    />
                  </div>

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Lokasi Event"
                    labelPlacement="outside"
                    placeholder="Contoh: Taman Ismail Marzuki, Jakarta"
                    name="location"
                    value={input.location}
                    onChange={(e) =>
                      setInput({ ...input, location: e.target.value })
                    }
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <div className="grid gap-2">
                    <p className="text-sm text-black">
                      Detail Event<strong className="text-danger">*</strong>
                    </p>

                    <CKEditor
                      value={input.detail}
                      onChange={(text) => {
                        setInput({ ...input, detail: text });
                      }}
                      token={token}
                    />
                  </div>
                </div>
              </div>

              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleCreateEvent}
              >
                Simpan Event
              </Button>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  pillars?: PillarDetails[];
  error?: any;
}> = async () => {
  try {
    const response = await fetcher({
      endpoint: "/pillars",
      method: "GET",
    });

    return {
      props: {
        pillars: response.data as PillarDetails[],
      },
    };
  } catch (error: any) {
    return {
      props: {
        error,
      },
    };
  }
};
