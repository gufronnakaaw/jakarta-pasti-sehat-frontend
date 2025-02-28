import { LogoJPS } from "@/public/img/logo";
import { customStyleInput } from "@/utils/customStyleInput";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@heroui/react";
import {
  Eye,
  EyeSlash,
  IconContext,
  Key,
  Lock,
  User,
} from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [input, setInput] = useState<{
    admin_id: string;
    access_key: string;
    password: string;
  }>({
    admin_id: "",
    access_key: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const response = await signIn("credentials", {
      ...input,
      redirect: false,
    });

    if (response?.error) {
      setLoading(false);
      const { error } = JSON.parse(response?.error);

      toast.error(error.message);
    }

    if (response?.ok) {
      toast.success("Anda Berhasil Login");
      return (window.location.href = "/dashboard");
    }
  }

  return (
    <>
      <Head>
        <title>Login | Jakarta Pasti Sehat</title>
      </Head>

      <main className="relative flex h-screen w-full items-center">
        <div className="relative h-full w-full">
          <Image
            src="/img/landing-img.png"
            alt="landing img"
            width={1440}
            height={750}
            className="h-full w-full object-cover object-right"
          />

          <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-tr from-green/80 to-orange" />
        </div>

        <div className="absolute right-24 z-20 grid gap-8">
          <div className="text-center">
            <h1 className="text-[36px] font-black -tracking-[1px] text-white">
              Selamat Datang Admin 👋
            </h1>
            <p className="font-medium text-white">
              Silakan login dulu untuk bisa mengatur semuanya
            </p>
          </div>

          <IconContext.Provider
            value={{
              weight: "bold",
              size: 18,
              className: "text-gray",
            }}
          >
            <div className="grid gap-2">
              <Input
                type="password"
                variant="flat"
                labelPlacement="outside"
                placeholder="Kunci Akses"
                name="access_key"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
                startContent={<Key />}
                classNames={customStyleInput}
              />

              <Input
                type="text"
                variant="flat"
                labelPlacement="outside"
                placeholder="ID Admin"
                name="admin_id"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
                startContent={<User />}
                classNames={customStyleInput}
              />

              <Input
                type={passwordType}
                variant="flat"
                labelPlacement="outside"
                placeholder="Kata Sandi"
                name="password"
                onChange={(e) =>
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
                onKeyDown={(e) => handleKeyDown(e, handleLogin)}
                endContent={
                  <button
                    onClick={() =>
                      setPasswordType((prevType) =>
                        prevType === "password" ? "text" : "password",
                      )
                    }
                  >
                    {passwordType === "password" ? <Eye /> : <EyeSlash />}
                  </button>
                }
                startContent={<Lock />}
                classNames={customStyleInput}
              />
            </div>
          </IconContext.Provider>

          <Button
            isLoading={loading}
            isDisabled={
              !Object.values(input).every((value) => value.trim() !== "") ||
              loading
            }
            color="primary"
            onPress={handleLogin}
            className="font-bold"
          >
            {loading ? "Tunggu Sebentar..." : "Masuk Sekarang"}
          </Button>
        </div>

        <div className="absolute bottom-24 left-24 z-20">
          <LogoJPS className={`h-auto w-[200px] text-white transition-all`} />
        </div>
      </main>
    </>
  );
}
