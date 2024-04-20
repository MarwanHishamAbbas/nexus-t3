"use client";

import { ArrowRight, Menu } from "lucide-react";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const NAV_LINKS = ["Templates", "Wallpapers", "Icons", "Fonts"];

function MobileNavbar() {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Browse Cateogries</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {NAV_LINKS.map((link, idx) => (
              <DropdownMenuItem key={idx}>{link}</DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            All-Acess Pass <ArrowRight className="ml-2 size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MobileNavbar;
