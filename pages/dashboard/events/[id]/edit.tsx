import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { EventDashboardDetail } from "@/types/event";
import { Pillar, PillarDetails } from "@/types/pillar";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import { getPillarId, getSubPillarId } from "@/utils/pillar";
import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { CalendarDateTime } from "@internationalized/date";
import { CalendarDots, FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

function checkTime(input: string, eventDate: string) {
  const newDate = new Date(input ? input : eventDate);

  if (input) {
    const date = new CalendarDateTime(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth() + 1,
      newDate.getUTCDate(),
      newDate.getUTCHours(),
      newDate.getUTCMinutes(),
      newDate.getUTCSeconds(),
    );

    return date;
  }

  const date = new CalendarDateTime(
    newDate.getUTCFullYear(),
    newDate.getUTCMonth() + 1,
    newDate.getUTCDate(),
    newDate.getUTCHours() + 7,
    newDate.getUTCMinutes(),
    newDate.getUTCSeconds(),
  );

  return date;
}

export default function EditEventPage({
  error,
  pillars,
  event,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [input, setInput] = useState({
    title: event?.title as string,
    detail: event?.detail as string,
    start: "",
    end: "",
    type: event?.type as string,
    location: event?.location as string,
    map_url: event?.map_url as string,
    payment_url: event?.payment_url as string,
  });
  const [status, setStatus] = useState<boolean>(event?.is_active as boolean);

  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>(
    event?.image_url as string,
  );

  const [pillar, setPillar] = useState(getPillarId(event?.pillar));
  const [subpillar, setSubpillar] = useState(getSubPillarId(event?.subpillar));
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);
  const [changePillar, setChangePillar] = useState(
    event?.pillar == "Lainnya" ? false : true,
  );

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return <LoadingScreen />;

  async function handleEditEvent() {
    setIsLoading(true);

    try {
      const formData = new FormData();

      if (filename) {
        const croppedImage = await getCroppedImg(fileImage, croppedAreaPixels);
        const response = await fetch(croppedImage as string);
        const blob = await response.blob();

        const fileConvert = new File([blob], `${filename}`, {
          type,
        });

        formData.append("events", fileConvert);
      }

      formData.append("event_id", event?.event_id as string);
      formData.append("title", input.title);
      formData.append("detail", input.detail);
      formData.append("type", input.type);
      formData.append("location", input.location);
      formData.append("by", by);
      formData.append("is_active", `${status}`);

      if (event?.pillar == "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      if (event?.pillar != "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      if (event?.payment_url != input.payment_url) {
        formData.append("payment_url", input.payment_url);
      }

      if (event?.payment_url != input.map_url) {
        formData.append("map_url", input.map_url);
      }

      if (input.start) {
        const start = new Date(input.start);
        start.setHours(start.getHours() - 7);
        formData.append("start", start.toISOString());
      }

      if (input.end) {
        const end = new Date(input.end);
        end.setHours(end.getHours() - 7);

        formData.append("end", end.toISOString());
      }

      await fetcher({
        endpoint: "/events",
        method: "PATCH",
        data: formData,
        token,
      });

      router.back();
      toast.success("Event berhasil diubah");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal mengubah data event");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Edit Event">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Event 📅"
            text="Edit dan kelola data event dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid w-full gap-8">
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

                  <Input
                    isRequired
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    variant="flat"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                    }}
                    onChange={(e) => {
                      if (!e.target.files?.length) {
                        setFileImage(null);
                        setFilename("");
                        setType("");
                        return;
                      }

                      const validTypes = [
                        "image/png",
                        "image/jpg",
                        "image/jpeg",
                      ];

                      if (!validTypes.includes(e.target.files[0].type)) {
                        toast.error("Ekstensi file harus png, jpg, atau jpeg");
                        setFileImage(null);
                        setFilename("");
                        setType("");
                        return;
                      }

                      setType(e.target.files[0].type);
                      setFilename(e.target.files[0].name);
                      const reader = new FileReader();
                      reader.readAsDataURL(e.target.files[0]);

                      reader.onload = function () {
                        setFileImage(reader.result);
                      };

                      reader.onerror = function (error) {
                        setFileImage(null);
                        setFilename("");
                        setType("");

                        toast.error("Terjadi kesalahan saat meload gambar");

                        console.log(error);
                      };
                    }}
                  />
                </div>

                <div className="grid gap-6">
                  <Switch
                    color="primary"
                    isSelected={changePillar}
                    onValueChange={(value) => {
                      setChangePillar(value);
                      setPillar("");
                      setSubpillar("");
                    }}
                  >
                    Aktifkan Pilar
                  </Switch>

                  {changePillar ? (
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
                        selectedKeys={[pillar as string]}
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
                          selectedKeys={[subpillar as string]}
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
                      setInput({
                        ...input,
                        type: e.target.value,
                        payment_url:
                          event?.type == "paid" ? event.payment_url : "",
                      })
                    }
                    classNames={{
                      trigger: "bg-white",
                      value: "font-semibold text-gray",
                    }}
                  >
                    <SelectItem key="free">Gratis</SelectItem>
                    <SelectItem key="paid">Berbayar</SelectItem>
                  </Select>

                  {input.type == "paid" ? (
                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Link Pembayaran"
                      labelPlacement="outside"
                      placeholder="Contoh: https://linkpembayaran.com"
                      value={input.payment_url}
                      onChange={(e) =>
                        setInput({ ...input, payment_url: e.target.value })
                      }
                      classNames={{
                        ...customStyleInput,
                        inputWrapper: "bg-white",
                      }}
                    />
                  ) : null}

                  <div className="grid grid-cols-2 items-center gap-4">
                    <DatePicker
                      isRequired
                      showMonthAndYearPickers
                      hideTimeZone={false}
                      variant="flat"
                      label="Tanggal Mulai"
                      labelPlacement="outside"
                      selectorIcon={<CalendarDots weight="bold" size={18} />}
                      hourCycle={24}
                      onChange={(date) => {
                        if (date) {
                          const newDate = date as DateValue;

                          setInput({
                            ...input,
                            start: newDate.toDate("UTC").toISOString(),
                          });
                        }
                      }}
                      dateInputClassNames={{
                        ...customStyleInput,
                        inputWrapper: "bg-white",
                      }}
                      value={checkTime(input.start, event?.start as string)}
                    />

                    <DatePicker
                      isRequired
                      showMonthAndYearPickers
                      hideTimeZone={false}
                      variant="flat"
                      label="Tanggal Selesai"
                      labelPlacement="outside"
                      selectorIcon={<CalendarDots weight="bold" size={18} />}
                      hourCycle={24}
                      onChange={(date) => {
                        if (date) {
                          const newDate = date as DateValue;

                          setInput({
                            ...input,
                            end: newDate.toDate("UTC").toISOString(),
                          });
                        }
                      }}
                      dateInputClassNames={{
                        ...customStyleInput,
                        inputWrapper: "bg-white",
                      }}
                      value={checkTime(input.end, event?.end as string)}
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

                  <Input
                    type="text"
                    variant="flat"
                    label="Link Maps (optional)"
                    labelPlacement="outside"
                    placeholder="Contoh: Taman Ismail Marzuki, Jakarta"
                    name="location"
                    value={input.map_url}
                    onChange={(e) =>
                      setInput({ ...input, map_url: e.target.value })
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

                  <Switch
                    color="primary"
                    isSelected={status}
                    onValueChange={setStatus}
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                    className="mb-4"
                  >
                    Status
                  </Switch>
                </div>
              </div>

              <Button
                isLoading={isLoading}
                isDisabled={
                  isLoading || changePillar ? !pillar || !subpillar : false
                }
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleEditEvent}
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
  event?: EventDashboardDetail;
  error?: any;
  token: string;
  by: string;
}> = async ({ params, req }) => {
  const token = req.headers["access_token"] as string;
  const by = req.headers["fullname"] as string;

  try {
    const [responsePillars, responseEvent] = await Promise.all([
      fetcher({
        endpoint: "/pillars",
        method: "GET",
      }),

      fetcher({
        endpoint: `/events/${params?.id}`,
        method: "GET",
        role: "admin",
        token,
      }),
    ]);

    return {
      props: {
        pillars: responsePillars.data as PillarDetails[],
        event: responseEvent.data as EventDashboardDetail,
        token,
        by,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error,
        token,
        by,
      },
    };
  }
};
