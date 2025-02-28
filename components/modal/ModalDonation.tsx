import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

type ModalDonationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalDonation({ isOpen, onClose }: ModalDonationProps) {
  return (
    <Modal placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="font-extrabold text-black">
          Syarat Donasi Jakarta Pasti Sehat
        </ModalHeader>

        <ModalBody>
          <div className="grid gap-6">
            <div className="-space-y-1">
              {[
                ["No. Rekening", "7040166194"],
                ["Atas Nama", "Niko Samuel"],
                ["Bank", "BCA"],
              ].map(([label, value], index) => (
                <div
                  key={index}
                  className="grid grid-cols-[90px_2px_1fr] gap-2 text-sm font-medium leading-[180%] text-gray"
                >
                  <p>{label}</p>
                  <div>:</div>
                  <p className="font-extrabold text-orange">{value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 text-sm font-medium leading-[160%] text-gray">
              <p>
                Untuk memastikan donasi tercatat dengan benar, setiap nominal
                transfer wajib ditambahkan dengan angka "003". Contohnya:
              </p>
              <ul className="grid max-w-[350px] list-outside list-disc gap-1 pl-5 text-sm">
                <li>
                  Jika ingin berdonasi{" "}
                  <span className="font-extrabold text-orange">Rp50.000,</span>{" "}
                  maka transfer sebesar{" "}
                  <span className="font-extrabold text-orange">Rp50.003.</span>
                </li>
                <li>
                  Jika ingin berdonasi{" "}
                  <span className="font-extrabold text-orange">Rp100.000,</span>{" "}
                  maka transfer sebesar{" "}
                  <span className="font-extrabold text-orange">Rp100.003.</span>
                </li>
              </ul>
              <p>
                Nominal tambahan ini merupakan bentuk dukungan dari Anda agar
                kami semakin bersemangat dalam menjalankan misi kesehatan bagi
                warga Jakarta. Terima kasih atas kepedulian dan kontribusi Anda!
                🧡
              </p>
            </div>

            <Button
              color="primary"
              className="w-full font-bold"
              onPress={() =>
                window.open("https://wa.me/+6285212775157", "_blank")
              }
            >
              Konfirmasi Donasi
            </Button>
          </div>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
