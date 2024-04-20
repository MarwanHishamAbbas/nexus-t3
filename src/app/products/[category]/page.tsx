import { type FC } from "react";
import PageHero from "~/components/common/Hero";
import ProductsList from "~/components/product/ProductsList";

interface PageProps {
  params: {
    category: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const { category } = params;

  const content = new Map<string, string>([
    [
      "Templates",
      "Explore our collection of premium, hand-crafted templates built to elevate your websites.",
    ],
    [
      "Wallpapers",
      "Make your websites stand out with our beautiful, pixel-perfect wallpapers ready to be used on your next project.",
    ],
  ]);

  return (
    <main>
      <PageHero title={category} description={content.get(category) ?? ""} />
      <ProductsList query={{ category: category }} />
    </main>
  );
};

export default Page;
