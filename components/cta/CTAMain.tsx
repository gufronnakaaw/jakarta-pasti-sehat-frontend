import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type CTAMainProps = {
  title: ReactNode;
};

export default function CTAMain({ title }: CTAMainProps) {
  const router = useRouter();

  return (
    <div className="relative flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-12 rounded-2xl bg-green p-16 md:gap-4">
      <div className="z-20 flex-1 text-[32px] font-black leading-[120%] text-white">
        {title}
      </div>

      <Button
        color="primary"
        onPress={() => router.push("/company/contact-us")}
        className="z-20 w-full px-8 font-bold capitalize md:w-max"
      >
        Hubungi Kami
      </Button>

      <Image
        src="/img/leaf-accent.svg"
        alt="accent img"
        width={300}
        height={500}
        className="absolute bottom-0 right-12 z-10 hidden h-auto w-[200px] md:flex"
      />

      <Image
        src="/img/leaf-accent.svg"
        alt="accent img"
        width={300}
        height={500}
        className="absolute bottom-0 left-12 z-10 h-auto w-[200px]"
      />
    </div>
  );
}
