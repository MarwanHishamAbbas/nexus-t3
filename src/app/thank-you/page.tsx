import { type FC } from "react";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const orderId = searchParams.orderId as string;
  const order = await api.payment.orderStatus(parseInt(orderId));
  const product = await api.product.productDetails(order.productId);
  console.log(order);

  return (
    <main>
      <h1>{product?.title}</h1>
      <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
    </main>
  );
};

export default Page;
