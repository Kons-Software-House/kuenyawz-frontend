import { motion } from 'framer-motion';

import { LighterBackgroundColors } from './Colors';
import TransitionLayer from './TransitionLayer';

type UpperSectionProps = {
  title?: string;
  subtitle?: string;
  background?: 'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500';
}

type HeaderProps = {
  title?: string;
  background?: string;
}

export default function UpperSection({ title, subtitle, background = 'bg-secondary-200' }: UpperSectionProps) {
  return (
    <motion.div>
      <TransitionLayer />
      <Header title={title} background={background} />
      <motion.div
        className={`${LighterBackgroundColors[background]} h-[2rem] sm:h-[3rem] lg:h-[6rem]`}>
        {subtitle && (
          <motion.h2
            className="text-center font-semi text-xl lg:text-3xl mb-4 truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
          >
            {subtitle}
          </motion.h2>
        )}
      </motion.div>
    </motion.div>
  );
}

function Header({ title, background }: HeaderProps) {
  return (
    <motion.div
      className={`${background} h-[8rem] sm:h-[10rem] lg:h-[18rem] flex items-center justify-center pt-[3.5rem] lg:pt-[4rem]`}>
      <motion.h1
        className="text-center font-fancy tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-shadow-[4]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: 'easeInOut' }}>
        {title}
      </motion.h1>
    </motion.div>
  );
}