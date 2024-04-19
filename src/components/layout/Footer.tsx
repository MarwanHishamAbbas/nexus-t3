import Image from "next/image";
import type { FC } from "react";
import NexusLogo from "~/assets/logo.svg";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="border">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-3 py-16 lg:flex-row lg:items-center">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src={NexusLogo as string} alt="Nexus Logo" />
            <span className="text-lg font-bold">NexusMarket</span>
          </Link>
          <h4 className="mt-5 text-lg">Get 15% off your first order!</h4>
          <p className="my-2 text-sm text-secondary lg:w-2/3">
            Sign up to our mailing list below to get 15% off your first order.
            Don&apos;t worry, we hate spam too.
          </p>
          <form className="flex items-center gap-2">
            <Input
              placeholder="Your email address"
              className="bg-input lg:w-1/2"
            />
            <Button size="lg">Subscribe</Button>
          </form>
        </div>
        <div className="flex items-start gap-8 text-sm">
          <div className="space-y-2">
            <h3>Products</h3>
            <p className="text-secondary">Templates</p>
            <p className="text-secondary">Backgrounds</p>
            <p className="text-secondary">Icons</p>
            <p className="text-secondary">Fonts</p>
          </div>
          <div className="space-y-2">
            <h3>All-Access Pass</h3>
            <p className="text-secondary">Sign Up</p>
            <p className="text-secondary">Login</p>
            <p className="text-secondary">Reset Password</p>
          </div>
          <div className="space-y-2">
            <h3>Information</h3>
            <p className="text-secondary">FAQ</p>
            <p className="text-secondary">Contact Us</p>
            <p className="text-secondary">Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
