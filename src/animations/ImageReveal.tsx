"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ImageReveal: FC<ImageRevealProps> = ({ children }, ...props) => {
  const imageRef = useRef(null);
  const imageAnimation = {
    initial: {
      filter: "blur(3px)",
      opacity: 0,
    },
    enter: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.45, 0, 0.55, 1],
      },
    },
  };
  const inView = useInView(imageRef, { once: true });

  return (
    <motion.div
      ref={imageRef}
      {...props}
      variants={imageAnimation}
      initial="initial"
      animate={inView ? "enter" : ""}
    >
      {children}
    </motion.div>
  );
};

export default ImageReveal;
