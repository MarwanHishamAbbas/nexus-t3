import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const orderId = searchParams.orderId as string;
  const order = await api.payment.orderStatus(parseInt(orderId));
  const product = await api.product.productDetails(order.productId);
  if (!order) return notFound();

  return (
    <main className="grid grid-cols-2 gap-10">
      <Image
        src="/thank.png"
        className="h-full w-full object-cover object-center"
        width={1000}
        height={1000}
        alt="thank you for your order"
      />

      <div>
        <div>
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-secondary">
              Order successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Thanks for ordering
            </h1>

            <div className="mt-16 text-sm font-medium">
              <div className="text-secondary">Order nr.</div>
              <div className="mt-2 ">{order.id}</div>

              <ul className="mt-6 divide-y divide-border border-t border-border text-sm font-medium text-secondary">
                <li className="flex space-x-6 py-6">
                  <Image
                    width={100}
                    height={100}
                    src={product?.image ?? ""}
                    alt={`${product?.title} image`}
                    className="flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex flex-auto flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="">{product?.title}</h3>

                      <p className="my-1">Category: {product?.category}</p>
                    </div>

                    {order.isPaid ? (
                      <a
                        href={product?.file}
                        download={product?.title}
                        className="underline-offset-2 hover:underline"
                      >
                        Download asset
                      </a>
                    ) : null}
                  </div>

                  <p className="flex-none font-medium ">${product?.price}</p>
                </li>
              </ul>

              {/* <PaymentStatus
              isPaid={order._isPaid}
              orderEmail={(order.user as User).email}
              orderId={order.id}
            /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
