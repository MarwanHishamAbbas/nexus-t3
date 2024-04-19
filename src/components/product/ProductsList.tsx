import type { TQueryValidator } from "~/lib/validator/query-validator";
import type { FC } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "~/trpc/server";
import Block from "~/animations/Block";

interface ProductsListProps {
  query: TQueryValidator;
}

const ProductsList: FC<ProductsListProps> = async ({ query }) => {
  const products = await api.product.products({ category: query.category });
  return (
    <div>
      <Block className="mb-4 flex items-center gap-3">
        <h1>{query?.category}</h1>

        <Link
          href="/framer-templates"
          className={buttonVariants({
            variant: "link",
            size: "sm",
            className: "text-secondary",
          })}
        >
          Explore All
          <ArrowRight className="size-5" />
        </Link>
      </Block>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
