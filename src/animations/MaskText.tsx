"use client"

import { FC, HTMLAttributes } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface MaskTextProps extends HTMLAttributes<HTMLDivElement> {}

const MaskText: FC<MaskTextProps> = ({ children }, ...props) => {
  const textRef = useRef(null)
  const textAnimation = {
    initial: {
      y: "100%",
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.45, 0, 0.55, 1],
      },
    },
  }
  const inView = useInView(textRef, { once: true })

  return (
    <motion.div
      ref={textRef}
      className="overflow-hidden"
      {...props}
      variants={textAnimation}
      initial="initial"
      animate={inView ? "enter" : ""}
    >
      {children}
    </motion.div>
  )
}

export default MaskText
