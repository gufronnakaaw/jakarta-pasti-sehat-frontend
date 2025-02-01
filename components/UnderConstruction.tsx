import { LogoJPS } from "@/public/img/logo";

export default function UnderConstruction() {
  return (
    <>
      <div className="mx-auto grid max-w-screen-md gap-5 px-4 py-8 text-center lg:px-12 lg:py-16">
        <div className="flex justify-center">
          <LogoJPS className="h-auto w-[180px] text-green transition-all" />
        </div>
        <p className="font-medium text-green md:text-lg xl:text-xl">
          We are working on something amazing! Please stay tuned.
        </p>
      </div>
    </>
  );
}
