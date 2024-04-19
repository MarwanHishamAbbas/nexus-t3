"use client";

import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface ProudctActionsProps {
  productId: number;
}

const ProudctActions: FC<ProudctActionsProps> = ({ productId }) => {
  const router = useRouter();
  const { mutate: deleteProduct, isPending } = api.product.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          {isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <MoreHorizontal className="size-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteProduct(productId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProudctActions;
