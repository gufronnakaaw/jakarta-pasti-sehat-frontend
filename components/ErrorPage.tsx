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
    <section className="grid w-full justify-center gap-8 p-8">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-[42px] font-black capitalize leading-[120%] -tracking-wide text-black">
            Ups terjadi sesuatu
          </h1>
        </div>

        <div className="grid items-start gap-[2px]">
          {[
            ["Status Kode", `${error.status_code}`],
            ["Pesan Error", `${getErrorMessage(error.status_code)}`],
          ].map(([text, value], index) => (
            <div key={index} className="grid grid-cols-[100px_2px_1fr] gap-4">
              <h4 className="font-medium text-gray">{text}</h4>
              <span className="font-medium text-gray">:</span>
              <h4 className="font-extrabold text-danger">{value}</h4>
            </div>
          ))}
        </div>

        <Button
          color="primary"
          className="mt-4 w-max px-8 font-bold"
          startContent={<ClockClockwise />}
          onPress={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    </section>
  );
}
