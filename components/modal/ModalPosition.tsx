import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
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
import { PencilLine, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

// type props: add position
type ModalAddPositionProps = {
  by: string;
  token: string;
  mutate: KeyedMutator<any>;
};

// modal: add positions
export function ModalAddPosition({ by, token, mutate }: ModalAddPositionProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleAddPosition() {
    setIsLoading(true);

    try {
      const payload = {
        name,
        by,
      };

      await fetcher({
        endpoint: "/positions",
        method: "POST",
        data: payload,
        token: token,
      });

      mutate();
      toast.success("Jabatan berhasil ditambahkan");
      setName("");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal menambah jabatan");
    } finally {
      setIsLoading(false);
    }
  }

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
                    isLoading={isLoading}
                    isDisabled={!name.trim() || isLoading}
                    color="primary"
                    onPress={() => {
                      handleAddPosition();

                      setTimeout(() => {
                        onClose();
                        setName("");
                      }, 500);
                    }}
                    className="px-6 font-bold"
                  >
                    {isLoading ? null : "Tambah Jabatan"}
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

// =====================================================================

// type props: edit position
type ModalEditPositionProps = {
  position_id: string;
  position_name: string;
  by: string;
  token: string;
  mutate: KeyedMutator<any>;
};

// modal: edit position
export function ModalEditPosition({
  position_id,
  position_name,
  by,
  token,
  mutate,
}: ModalEditPositionProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [name, setName] = useState<string>(position_name);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleEditPosition() {
    setIsLoading(true);

    try {
      const payload = {
        position_id,
        name,
        by,
      };

      await fetcher({
        endpoint: "/positions",
        method: "PATCH",
        data: payload,
        token: token,
      });

      mutate();
      toast.success("Jabatan berhasil diubah");
      setName("");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal mengubah jabatan");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button isIconOnly variant="light" size="sm" onPress={onOpen}>
        <PencilLine />
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
                Edit Jabatan
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Jabatan"
                  labelPlacement="outside"
                  placeholder="Contoh: Marketing"
                  defaultValue={name}
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
                    isLoading={isLoading}
                    isDisabled={!name.trim() || isLoading}
                    color="primary"
                    onPress={() => {
                      handleEditPosition();

                      setTimeout(() => {
                        onClose();
                        setName("");
                      }, 500);
                    }}
                    className="px-6 font-bold"
                  >
                    {isLoading ? null : "Simpan Jabatan"}
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
