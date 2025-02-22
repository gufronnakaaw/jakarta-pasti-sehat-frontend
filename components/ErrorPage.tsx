import { Button } from "@heroui/react";
import { ClockClockwise } from "@phosphor-icons/react";

function getErrorMessage(status_code: any) {
  if (status_code >= 400 && status_code <= 499) {
    return "Terjadi kesalahan pada client side. Silakan coba lagi nanti.";
  }

  if (status_code >= 500) {
    return "Terjadi kesalahan pada server side. Silakan coba lagi nanti.";
  }

  return "Terjadi kesalahan yang tidak diketahui.";
}

export default function ErrorPage({ error }: { error: any }) {
  console.error(error);
  return (
    <section className="flex w-full items-center justify-center p-8">
      <div className="grid gap-6">
        <h1 className="text-[42px] font-black capitalize leading-[120%] -tracking-wide text-black">
          Oppss, telah terjadi sesuatu
        </h1>

        <div className="grid items-start gap-1">
          {[
            ["Status Kode", `${error.status_code}`],
            ["Pesan Error", `${getErrorMessage(error.status_code)}`],
          ].map(([text, value], index) => (
            <div
              key={index}
              className="grid grid-cols-[100px_2px_1fr] gap-4 font-medium text-black"
            >
              <h4>{text}</h4>
              <span>:</span>
              <h4 className="font-bold text-danger">{value}</h4>
            </div>
          ))}
        </div>

        <Button
          color="primary"
          startContent={<ClockClockwise weight="bold" size={18} />}
          onPress={() => window.location.reload()}
          className="mt-8 w-max px-12 font-bold"
        >
          Refresh
        </Button>
      </div>
    </section>
  );
}
