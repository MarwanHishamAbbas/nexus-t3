"use client";

import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Mouse, PaintRollerIcon, PlayIcon } from "lucide-react";
import patternLeft from "../../assets/pattern-left.svg";
import patternRight from "../../assets/pattern-right.svg";
import marwan from "../../assets/Marwan.jpeg";

import Block from "~/animations/Block";
import ImageReveal from "~/animations/ImageReveal";
import { api } from "~/trpc/react";

const HomeHero = () => {
  const {} = api.product.create.useMutation();
  return (
    <div className="grid grid-cols-1 gap-5 text-center lg:grid-cols-4">
      <ImageReveal>
        <Image src={patternLeft as string} alt="Pattern" />
      </ImageReveal>
      <Block className="col-span-2 space-y-6">
        <div className="inline-flex items-center justify-center gap-2">
          <span className="text-secondary text-sm">Created By</span>
          <Image
            src={marwan}
            alt="Marwan"
            className="size-10 rounded-full object-cover"
          />
          <h3 className="text-sm font-medium">Marwan Hisham</h3>
        </div>

        <h1 className="text-4xl font-semibold">The Future Of E-Commerce</h1>

        <p className="text-secondary text-sm">
          Ultimate Framer template to transform your website into an eCommerce
          powerhouse. Sell digital products easily & beautifully, powered by the
          Framer CMS.{" "}
        </p>
        <Input
          placeholder="Ex....Website Templates"
          className="gradient-bg mx-auto lg:w-3/4"
        />

        <Block className="text-secondary  inline-flex flex-wrap justify-evenly gap-5 text-xs">
          <div className="flex items-center gap-2">
            <PaintRollerIcon />
            <p>Easily Customizable</p>
          </div>
          <div className="flex items-center gap-2">
            <PlayIcon />
            <p>Lightning Fast</p>
          </div>
          <div className="flex items-center gap-2">
            <Mouse />
            <p>One-Click Import</p>
          </div>
        </Block>
      </Block>
      <ImageReveal>
        <Image
          src={patternRight as string}
          alt="Pattern"
          className="hidden lg:block"
        />
      </ImageReveal>
    </div>
  );
};

export default HomeHero;
