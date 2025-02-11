import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { CaretUpDown, SignOut } from "@phosphor-icons/react";

export default function NavbarDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatName = (name: string): string => {
    const parts: string[] = name.split(" ");
    let result: string;

    if (parts.length === 1) {
      result = parts[0];
    } else if (parts.length === 2) {
      result = `${parts[0]} ${parts[1].charAt(0)}.`;
    } else {
      result = `${parts[0]} ${parts[1].charAt(0)}. ${parts[2].charAt(0)}.`;
    }

    return result;
  };

  return (
    <nav className="bg-gray/5 px-6">
      <div className="flex h-20 items-center justify-end">
        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-5 hover:cursor-pointer">
              <div className="inline-flex items-center gap-2.5">
                <Avatar
                  isBordered
                  showFallback
                  size="sm"
                  src="/favicon.ico"
                  classNames={{
                    base: "ring-orange bg-orange/20",
                    icon: "text-orange",
                  }}
                />

                <div>
                  <h6 className="text-sm font-bold text-black">
                    {formatName("Fajar Fadillah Agustian")}
                  </h6>
                  <p className="text-[12px] font-semibold uppercase text-gray">
                    JPS123456
                  </p>
                </div>
              </div>

              <CaretUpDown weight="bold" size={16} className="text-black" />
            </div>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="profile actions"
            itemClasses={{
              title: "font-semibold",
            }}
          >
            <DropdownSection
              aria-label="danger zone section"
              title="Anda Yakin?"
            >
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<SignOut weight="bold" size={18} />}
                className="text-danger-600"
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
