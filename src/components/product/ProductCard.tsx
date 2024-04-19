import Image from "next/image";
import type { FC } from "react";

import ImageReveal from "~/animations/ImageReveal";
import { type TTRPCProductSchema } from "~/lib/validator/product-validator";
import Block from "~/animations/Block";

interface ProductCardProps {
  product: TTRPCProductSchema;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <ImageReveal>
        <Image
          src={product.image}
          alt="Image"
          width={200}
          height={200}
          className="w-full rounded-lg"
          loading="eager"
        />
      </ImageReveal>
      <Block className="mt-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm">{product.title}</h4>
          <p className="text-xs text-secondary">{product.category}</p>
        </div>
        <span className="text-xs text-secondary">${product.price}</span>
      </Block>
    </div>
  );
};

export default ProductCard;
