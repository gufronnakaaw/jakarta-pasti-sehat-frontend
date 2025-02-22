import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { cloneElement } from "react";

type ModalConfirmDeleteProps = {
  trigger: any;
  footer: any;
};

export default function ModalConfirmDelete({
  trigger,
  footer,
}: ModalConfirmDeleteProps) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {cloneElement(trigger, { onClick: onOpen })}

      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-extrabold text-black">
                Konfirmasi ⚠️
              </ModalHeader>

              <ModalBody>
                <p className="text-sm font-medium leading-[160%] text-gray">
                  Apakah anda yakin?
                  <br />
                  Data yang sudah dihapus{" "}
                  <span className="font-black text-danger">
                    tidak dapat
                  </span>{" "}
                  dipulihkan!
                </p>
              </ModalBody>

              {footer && (
                <ModalFooter>
                  <div className="inline-flex items-center gap-2">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="px-6 font-bold"
                    >
                      Tutup
                    </Button>

                    {typeof footer == "function" ? footer(onClose) : footer}
                  </div>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
