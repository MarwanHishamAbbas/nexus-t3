"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import Block from "~/animations/Block";
import ImageReveal from "~/animations/ImageReveal";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const { productId } = params;
  const { data: product } = api.product.productDetails.useQuery(productId);
  const router = useRouter();

  const { mutate, isPending } = api.payment.buyProduct.useMutation({
    onSuccess: (data) => {
      router.replace(data.url ?? "");
    },
  });

  return (
    <main className=" grid grid-cols-1 justify-start gap-8 space-y-0 md:grid-cols-3">
      <div className="md:col-span-2">
        <ImageReveal>
          <Image
            src={product?.image ?? ""}
            alt={product?.title ?? ""}
            width={1000}
            height={500}
            className="h-[600px] object-cover object-top"
          />
        </ImageReveal>
      </div>
      <Block>
        <h1 className="text-2xl font-semibold md:text-4xl">{product?.title}</h1>
        <div className="mb-5 mt-3">
          <Badge variant={"outline"}>{product?.category.toUpperCase()}</Badge>
          <Badge variant={"outline"}>CHANGELOG</Badge>
        </div>
        <p className="text-sm text-secondary md:text-base">
          {product?.description}
        </p>
        <Button
          disabled={isPending}
          className={buttonVariants({
            size: "lg",
            className: "mt-5 w-full",
          })}
          onClick={() => {
            mutate(product!);
          }}
        >
          Buy Now - ${product?.price}
          {isPending && <Loader2 className="ml-1 size-5 animate-spin" />}
        </Button>
        <p className="my-3 text-center text-xs text-secondary/80">
          Please note: Standard VAT rate may be charged in accordance with your
          country.
        </p>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "w-full ",
          })}
          href="/preview"
        >
          Preview
        </Link>
      </Block>
    </main>
  );
};

export default Page;
