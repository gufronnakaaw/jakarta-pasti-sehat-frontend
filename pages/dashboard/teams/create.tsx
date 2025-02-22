import ButtonBack from "@/components/button/ButtonBack";
import { InputImage } from "@/components/InputImage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { edulevels, socialList } from "@/data/data";
import { Position } from "@/types/position";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

type InputState = {
  fullname: string;
  description: string;
  position: string;
};

type EducationState = {
  name: string;
  level: string;
};

type SocialLinksState = {
  name: string;
  url: string;
};

export default function CreateTeamPage({
  error,
  positions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [input, setInput] = useState<InputState>({
    fullname: "",
    description: "",
    position: "",
  });
  const [selected, setSelected] = useState({
    withEducation: false,
    withSocialLinks: false,
  });
  const [educations, setEducations] = useState<EducationState[]>([
    { name: "", level: "" },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksState[]>([
    { name: "", url: "" },
  ]);

  const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>();
  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleListChange<T>(
    setter: Dispatch<SetStateAction<T[]>>,
    index: number,
    field: keyof T,
    value: string,
  ) {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  function addItem<T>(setter: Dispatch<SetStateAction<T[]>>, newItem: T) {
    setter((prev) => [...prev, newItem]);
  }

  function removeItem<T>(setter: Dispatch<SetStateAction<T[]>>, index: number) {
    setter((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleCreateTeam() {
    setLoading(true);

    try {
      const formData = new FormData();
      const by = "Super Admin";

      const croppedImage = await getCroppedImg(fileImage, croppedAreaPixels);
      const response = await fetch(croppedImage as string);
      const blob = await response.blob();
      const fileConvert = new File([blob], "team-img.jpg", {
        type: "image/jpg",
      });

      formData.append("fullname", input.fullname);
      formData.append("description", input.description);
      formData.append("position_id", input.position);
      formData.append("by", by);
      formData.append("with_education", selected.withEducation as any);
      formData.append("with_social_links", selected.withSocialLinks as any);
      formData.append("teams", fileConvert);
      educations.forEach((edu, index) => {
        formData.append(`educations[${index}][name]`, edu.name);
        formData.append(`educations[${index}][level]`, edu.level);
      });
      socialLinks.forEach((social, index) => {
        formData.append(`social_links[${index}][name]`, social.name);
        formData.append(`social_links[${index}][url]`, social.url);
      });

      await fetcher({
        endpoint: "/teams",
        method: "POST",
        data: formData,
        file: true,
        token,
      });

      router.back();
      toast.success("Tim berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambahkan tim");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Tim">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Tim 👥"
            text="Buat dan kelola tim baru dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          <div className="grid max-w-[900px] gap-8">
            <div className="grid grid-cols-[300px_1fr] items-start gap-8">
              {/* data image */}
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
                    <strong className="mr-1 text-danger">*</strong>ratio gambar
                    1:1
                  </p>
                </div>

                <InputImage {...{ setFileImage }} />
              </div>

              {/* data form input */}
              <div className="grid gap-8">
                {/* main */}
                <div className="grid gap-4">
                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Nama Lengkap"
                    labelPlacement="outside"
                    placeholder="Contoh: John Doe"
                    name="fullname"
                    onChange={(e) => handleInputChange(e)}
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <Select
                    isRequired
                    aria-label="select position"
                    variant="flat"
                    label="Pilih Jabatan"
                    labelPlacement="outside"
                    placeholder="Contoh: Manager"
                    name="position"
                    items={positions}
                    value={input.position}
                    selectedKeys={[input.position]}
                    onChange={(e) => handleInputChange(e)}
                    classNames={{
                      trigger: "bg-white",
                      value: "font-semibold text-gray",
                    }}
                  >
                    {(position: Position) => (
                      <SelectItem key={position.position_id}>
                        {position.name}
                      </SelectItem>
                    )}
                  </Select>

                  <Textarea
                    isRequired
                    type="text"
                    variant="flat"
                    maxRows={8}
                    label="Deskripsi"
                    labelPlacement="outside"
                    placeholder="Contoh: Saya adalah seorang yang ramah dan rajin"
                    name="description"
                    onChange={(e) => handleInputChange(e)}
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />
                </div>

                {/* educations */}
                <div className="grid gap-4">
                  <Switch
                    color="primary"
                    isSelected={selected.withEducation}
                    onValueChange={(value) =>
                      setSelected((prev) => ({ ...prev, withEducation: value }))
                    }
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                  >
                    Tambahkan Pendidikan
                  </Switch>

                  {selected.withEducation && (
                    <div className="grid gap-2">
                      {educations.map((edu, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[150px_1fr_max-content] gap-4"
                        >
                          <Select
                            isRequired
                            aria-label="select edulevel"
                            variant="flat"
                            labelPlacement="outside"
                            placeholder="Tingkatan"
                            selectedKeys={[edu.level]}
                            onChange={(e) =>
                              handleListChange(
                                setEducations,
                                index,
                                "level",
                                e.target.value,
                              )
                            }
                            classNames={{
                              trigger: "bg-white",
                              value: "font-semibold text-gray",
                            }}
                          >
                            {edulevels.map((edu) => (
                              <SelectItem key={edu}>{edu}</SelectItem>
                            ))}
                          </Select>

                          <Input
                            isRequired
                            type="text"
                            variant="flat"
                            labelPlacement="outside"
                            placeholder="Contoh: Universitas Harapan Indonesia"
                            value={edu.name}
                            onChange={(e) =>
                              handleListChange(
                                setEducations,
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            classNames={{
                              ...customStyleInput,
                              inputWrapper: "bg-white",
                            }}
                            className="flex-1"
                          />

                          <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            onPress={() => removeItem(setEducations, index)}
                          >
                            <Trash
                              weight="bold"
                              size={18}
                              className="text-danger"
                            />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="light"
                        startContent={<Plus weight="bold" size={18} />}
                        onPress={() =>
                          addItem(setEducations, { name: "", level: "" })
                        }
                        className="font-bold"
                      >
                        Tambah
                      </Button>
                    </div>
                  )}
                </div>

                {/* social links */}
                <div className="grid gap-4">
                  <Switch
                    color="primary"
                    isSelected={selected.withSocialLinks}
                    onValueChange={(value) =>
                      setSelected((prev) => ({
                        ...prev,
                        withSocialLinks: value,
                      }))
                    }
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                  >
                    Tambahkan Sosial Media
                  </Switch>

                  {selected.withSocialLinks && (
                    <div className="grid gap-2">
                      {socialLinks.map((social, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[150px_1fr_max-content] gap-4"
                        >
                          <Select
                            isRequired
                            aria-label="select social media"
                            variant="flat"
                            labelPlacement="outside"
                            placeholder="Media"
                            selectedKeys={[social.name]}
                            onChange={(e) =>
                              handleListChange(
                                setSocialLinks,
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            classNames={{
                              trigger: "bg-white",
                              value: "font-semibold text-gray",
                            }}
                          >
                            {socialList.map((social) => (
                              <SelectItem key={social}>{social}</SelectItem>
                            ))}
                          </Select>

                          <Input
                            isRequired
                            type="text"
                            variant="flat"
                            labelPlacement="outside"
                            placeholder="Contoh: https://instagram.com/xxxxx"
                            value={social.url}
                            onChange={(e) =>
                              handleListChange(
                                setSocialLinks,
                                index,
                                "url",
                                e.target.value,
                              )
                            }
                            classNames={{
                              ...customStyleInput,
                              inputWrapper: "bg-white",
                            }}
                            className="flex-1"
                          />

                          <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            onPress={() => removeItem(setSocialLinks, index)}
                          >
                            <Trash
                              weight="bold"
                              size={18}
                              className="text-danger"
                            />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="light"
                        startContent={<Plus weight="bold" size={18} />}
                        onPress={() =>
                          addItem(setSocialLinks, { name: "", url: "" })
                        }
                        className="font-bold"
                      >
                        Tambah
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              isLoading={loading}
              isDisabled={loading}
              color="primary"
              startContent={
                loading ? null : <FloppyDisk weight="bold" size={18} />
              }
              onPress={handleCreateTeam}
              className="w-max justify-self-end font-bold"
            >
              {loading ? "Tunggu Sebentar..." : "Simpan Tim"}
            </Button>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  positions?: Position[];
  error?: any;
}> = async () => {
  try {
    const response = await fetcher({
      endpoint: `/positions`,
      method: "GET",
      role: "admin",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
    });

    return {
      props: {
        positions: response.data as Position[],
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
