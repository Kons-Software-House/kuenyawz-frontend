import { motion } from 'framer-motion';

type BackdropProps = {
  children?: React.ReactNode;
  onClose: () => void;

}

export default function Backdrop({ children, onClose }: BackdropProps) {
  return (
    <motion.div onClick={() => { onClose() }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed h-full w-full bg-black/40 flex items-center justify-center z-50">
      <div className="bg-slate-100 shadow-lg rounded-lg w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6" onClick={(e) => { e.stopPropagation() }}>
        {children}
      </div>
    </motion.div>
  )
}