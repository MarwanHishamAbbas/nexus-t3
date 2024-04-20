import Image from "next/image";
import React from "react";
import patternLeft from "~/assets/pattern-left.svg";
import patternRight from "~/assets/pattern-right.svg";
import { Button } from "~/components/ui/button";
import Block from "~/animations/Block";
import ImageReveal from "~/animations/ImageReveal";

const Banner = ({}) => {
  return (
    <div className="mb-16 grid grid-cols-1 -space-y-24 text-center lg:mb-32 lg:grid-cols-4 lg:-space-x-24 lg:-space-y-0">
      <ImageReveal>
        <Image src={patternRight as string} alt="Pattern" />
      </ImageReveal>

      <Block className="bg-blur z-10 col-span-2 space-y-6 rounded-lg border px-2 py-24 lg:px-8">
        <h1 className="text-4xl font-semibold">
          Want unlimited access to <br /> our entire catalogue?
        </h1>

        <p className="mx-auto text-sm text-secondary lg:w-3/4">
          Get unlimited access to our full collection of templates, backgrounds,
          mockups, fonts and more and take your workflow to the next level.
        </p>
        <Button>Get All-Access Pass</Button>
      </Block>
      <ImageReveal>
        <Image src={patternLeft as string} alt="Pattern" />
      </ImageReveal>
    </div>
  );
};

export default Banner;
