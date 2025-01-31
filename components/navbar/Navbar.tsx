import { LogoJPS } from "@/public/img/logo";
import { Button } from "@heroui/react";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const navMenu = [
  { key: "home", path: "/", text: "Beranda" },
  { key: "about", path: "/about-us", text: "Tentang Kami" },
  { key: "documentation", path: "/documentation", text: "Dokumentasi" },
  { key: "article", path: "/article", text: "Artikel" },
  { key: "event", path: "/event", text: "Event" },
  { key: "contact", path: "contact-us", text: "Hubungi Kami" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const isHome = router.pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setStickyHeader(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1025) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all ${isHome ? (stickyHeader ? "bg-white" : "bg-transparent") : "bg-white"}`}
    >
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between gap-4 px-6">
        <Link href="#">
          <LogoJPS
            className={`h-auto w-[100px] transition-all ${
              isHome
                ? stickyHeader
                  ? "text-green"
                  : "text-white"
                : "text-green"
            }`}
          />
        </Link>

        {/* === desktop view === */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-8 xl:gap-12">
          {navMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-sm font-medium hover:text-orange hover:underline ${
                isHome
                  ? stickyHeader
                    ? "text-black"
                    : "text-white"
                  : "text-black"
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* === mobile view === */}
        <div
          className={`absolute top-0 z-20 flex h-screen w-[75%] flex-col items-center justify-center gap-8 bg-white shadow-lg transition-all lg:hidden ${isMenuOpen ? "left-0" : "-left-full"}`}
        >
          {navMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-sm font-medium text-black hover:text-orange hover:underline"
            >
              {item.text}
            </Link>
          ))}

          <div className="absolute left-0 top-4 flex w-full items-center justify-between gap-2 px-4">
            <Link href="#">
              <LogoJPS className="h-auto w-[100px] text-green" />
            </Link>

            <Button isIconOnly variant="light" onPress={toggleMenu}>
              <X weight="bold" size={18} />
            </Button>
          </div>
        </div>

        <div className="flex items-center">
          <Button color="secondary" className="font-bold">
            Dukungan Untuk Kami
          </Button>

          <Button
            isIconOnly
            variant="light"
            onPress={toggleMenu}
            className={`ml-2 lg:hidden ${
              isHome
                ? stickyHeader
                  ? "text-black"
                  : "text-white"
                : "text-black"
            }`}
          >
            <List weight="bold" size={24} />
          </Button>
        </div>
      </div>

      {/* === overlay === */}
      <div
        className={`absolute left-0 top-0 z-10 h-screen w-full bg-black/30 backdrop-blur-[2px] transition-all ${isMenuOpen ? "flex" : "hidden"}`}
        onClick={toggleMenu}
      />
    </nav>
  );
}
