"use client";

import type { FC, HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "~/lib/utils";

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Block: FC<BlockProps> = ({ children, className }, ...props) => {
  const blockRef = useRef(null);
  const blockChildren = Array.from(children as ArrayLike<unknown>);
  const blockAnimation = {
    initial: { y: "100%", filter: "blur(3px)", opacity: 0 },
    enter: (i: number) => ({
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.45, 0, 0.55, 1],
        delay: 0.2 * i,
      },
    }),
  };
  const inView = useInView(blockRef, { once: true });
  return (
    <div {...props} className={cn("", className)}>
      {blockChildren.map((child, idx) => (
        <motion.div
          key={idx}
          ref={blockRef}
          custom={idx}
          variants={blockAnimation}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {child as ReactNode}
        </motion.div>
      ))}
    </div>
  );
};

export default Block;
