import { customStyleInput } from "@/utils/customStyleInput";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Plus } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

type ModalAddPositionProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  loading?: boolean;
  handleAddPosition?(): Promise<void>;
};

export function ModalAddPosition({
  name,
  setName,
  loading,
  handleAddPosition,
}: ModalAddPositionProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        startContent={<Plus weight="bold" size={18} />}
        onPress={onOpen}
        className="font-bold"
      >
        Tambah Jabatan
      </Button>

      <Modal
        isDismissable={false}
        hideCloseButton={true}
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-extrabold text-black">
                Tambah Jabatan
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Jabatan"
                  labelPlacement="outside"
                  placeholder="Contoh: Marketing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  classNames={{
                    ...customStyleInput,
                    inputWrapper: "bg-white",
                  }}
                  className="flex-1"
                />
              </ModalBody>

              <ModalFooter>
                <div className="inline-flex items-center gap-2">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      setName("");
                    }}
                    className="px-6 font-bold"
                  >
                    Tutup
                  </Button>

                  <Button
                    isLoading={loading}
                    isDisabled={!name.trim() || loading}
                    color="primary"
                    onPress={() => {
                      handleAddPosition?.();

                      setTimeout(() => {
                        onClose();
                        setName("");
                      }, 500);
                    }}
                    className="px-6 font-bold"
                  >
                    {loading ? null : "Tambah Jabatan"}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
