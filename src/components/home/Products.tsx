import React from "react";
import ProductsList from "../product/ProductsList";

const Products = () => {
  return (
    <div className="space-y-14">
      <ProductsList query={{ category: "Templates" }} />
      <ProductsList query={{ category: "Icons" }} />
      <ProductsList query={{ category: "Wallpapers" }} />
    </div>
  );
};

export default Products;
