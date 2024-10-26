import { motion, useScroll, useTransform } from 'framer-motion';

type ContainerProps = {
  children?: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  return (
    <motion.div className="flex justify-center mb-5 mt-5" style={{ y }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}>
      <div className="container flex flex-col items-center lg:w-9/12">
        {children}
      </div>
    </motion.div>
  )
}