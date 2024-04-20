import Image from "next/image";
import Link from "next/link";

import NexusLogo from "../../assets/logo.svg";
import { buttonVariants } from "../ui/button";

import { ArrowRight } from "lucide-react";
import MobileNavbar from "./MobileNavbar";

export const NAV_LINKS = ["Templates", "Wallpapers", "Icons", "Fonts"];

const Navbar = async ({}) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b border-input bg-background/60 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src={NexusLogo as string} alt="Nexus Logo" />
          <span className="text-lg font-bold">NexusMarket</span>
        </Link>
        <ul className="hidden items-center gap-8 lg:flex ">
          {NAV_LINKS.map((link, idx) => (
            <li key={idx}>
              <Link
                className={buttonVariants({ variant: "link" })}
                href={`/products/${link}`}
              >
                {link}
              </Link>
            </li>
          ))}

          <Link
            href="/admin"
            className={buttonVariants({
              className: "rounded-lg",
              size: "lg",
            })}
          >
            All-Access Pass <ArrowRight className="ml-2 size-4" />
          </Link>
        </ul>
        <MobileNavbar />
      </nav>
    </header>
  );
};

export default Navbar;
