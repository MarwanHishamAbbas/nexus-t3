import React from "react";
import Banner from "~/components/home/Banner";
import PageHero from "~/components/common/Hero";
import Products from "~/components/home/Products";

const HomePage = () => {
  return (
    <main>
      <PageHero
        title="The future of commerce."
        description="Ultimate Framer template to transform your website into an eCommerce powerhouse. Sell digital products easily & beautifully, powered by the Framer CMS."
      />
      <Products />
      <Banner />
    </main>
  );
};

export default HomePage;
