import Link from "next/link";
import { type FC } from "react";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const product = await api.product.productDetails(
    searchParams.productId as string,
  );
  return (
    <main>
      <a download href={product?.image ?? ""} className={buttonVariants({})}>
        Download
      </a>
    </main>
  );
};

export default Page;
