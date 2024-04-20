import Image from "next/image";
import type { FC } from "react";

import ImageReveal from "~/animations/ImageReveal";
import Block from "~/animations/Block";
import Link from "next/link";
import type { Product } from "@prisma/client";
import { Card } from "../ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <ImageReveal>
        <Card>
          <Image
            src={product.image}
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-lg"
            loading="eager"
          />
        </Card>
      </ImageReveal>
      <Block className="mt-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm">{product.title}</h4>
          <p className="text-xs text-secondary">{product.category}</p>
        </div>
        <span className="text-xs text-secondary">${product.price}</span>
      </Block>
    </Link>
  );
};

export default ProductCard;
