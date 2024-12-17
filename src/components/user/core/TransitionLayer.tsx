import { motion } from 'framer-motion';

import { LighterBackgroundColors } from './Colors';
import { useTransitionColor } from '../../../contexts/TransitionColorContext';

export default function TransitionLayer() {
  const handleAnimationStart = () => {
    window.scrollTo(0, 0);
  };

  const handleAnimationEnd = () => {
    window.scrollTo(0, 0);
  };

  const { transitionColor } = useTransitionColor();

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 bottom-0 flex flex-col z-20'
      initial={{ visibility: 'visible' }}
      animate={{ visibility: 'hidden' }}
      exit={{ visibility: 'visible' }}
      transition={{
        duration: 1,
        delay: 0,
        ease: 'easeInOut',
      }}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationEnd}
    >
      <motion.div className='flex' initial={{ justifyItems: 'start' }} exit={{ justifyContent: 'end' }}>
        <motion.div
          className={`${transitionColor} h-[8rem] sm:h-[10rem] lg:h-[18rem] brightness-[95%]`}
          initial={{ width: '120%' }}
          animate={{ width: '0%' }}
          exit={{ width: '120%' }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div className='flex h-full' initial={{ justifyItems: 'start' }} exit={{ justifyContent: 'end' }}>
        <motion.div
          className={`${LighterBackgroundColors[transitionColor]} brightness-[95%]`}
          initial={{ width: '120%' }}
          animate={{ width: '0%' }}
          exit={{ width: '120%' }}
          transition={{
            delay: 0.3, duration: 0.5, ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}