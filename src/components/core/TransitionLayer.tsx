import { motion } from 'framer-motion';
import { BackgroundColors, LighterBackgroundColors } from './Colors';


export default function TransitionLayer({ background = 'bg-secondary-200' }: BackgroundColors) {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col'>
            <motion.div className='flex' initial={{ justifyItems: 'start' }} exit={{ justifyContent: 'end' }}>
                <motion.div className={`${background} h-[18rem] brightness-[95%]`} initial={{ width: '120%' }} animate={{ width: '0%' }} exit={{ width: '120%' }} transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }} />
            </motion.div>
            <motion.div className='flex' initial={{ justifyItems: 'start' }} exit={{ justifyContent: 'end' }}>
                <motion.div className={`${LighterBackgroundColors[background]} h-[6rem] brightness-[95%]`} initial={{ width: '120%' }} animate={{ width: '0%' }} exit={{ width: '120%' }} transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }} />
            </motion.div>
            <motion.div className='flex h-full' initial={{ justifyItems: 'start' }} exit={{ justifyContent: 'end' }}>
                <motion.div className={`bg-white h-full brightness-[95%]`} initial={{ width: '120%' }} animate={{ width: '0%' }} exit={{ width: '120%' }} transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }} />
            </motion.div>
        </div>
    );

}