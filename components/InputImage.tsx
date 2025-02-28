import { Input, InputProps } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type InputImageProps = InputProps & {
  setFileImage: Dispatch<
    SetStateAction<string | ArrayBuffer | null | undefined>
  >;
};

export function InputImage({ setFileImage, ...props }: InputImageProps) {
  return (
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
        if (!e.target.value) return;

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files?.[0] as File);
        reader.onload = () => {
          setFileImage(reader.result as string);
        };
        reader.onerror = function (error) {
          toast.error("Terjadi kesalahan saat memasukan gambar!");
          console.error(error);
        };
      }}
      {...props}
    />
  );
}
