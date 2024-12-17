import { motion } from "framer-motion";

export default function LoadingCard() {
  return (
    <div>
      <motion.div className={`relative animate-pulse aspect-[2/3] relative flex justify-center items-center border-gray-200 border-4
        before:absolute before:-inset-0 before:rotate-6 before:bg-gray-200 before:-z-10 before:transition-transform before:duration-300`} initial='default' whileHover='hover'>
      </motion.div>
    </div>
  )
}