import { customStyleInput } from "@/utils/customStyleInput";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { Button, Input } from "@heroui/react";
import { Eye, EyeSlash, IconContext, Lock, User } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [input, setInput] = useState<{
    admin_id: string;
    password: string;
  }>({
    admin_id: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    toast.success("Yeay, anda berhasil login");
  }

  return (
    <>
      <Head>
        <title>Login | Jakarta Pasti Sehat</title>
      </Head>

      <main className="flex h-screen w-full items-center justify-center py-20">
        <div className="grid w-max gap-8 justify-self-center">
          <div className="text-center">
            <h1 className="text-[26px] font-bold -tracking-[1px] text-black lg:text-[36px]">
              Hi, Admin Jakarta Pasti Sehat 👋
            </h1>
            <p className="font-medium text-gray">
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
      </main>
    </>
  );
}
