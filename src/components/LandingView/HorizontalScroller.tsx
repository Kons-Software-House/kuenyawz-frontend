import { useEffect, useRef } from 'react';

import placeholder1 from '../../assets/LandingView/HorizontalScroller/placeholder (1).jpeg';
import placeholder2 from '../../assets/LandingView/HorizontalScroller/placeholder (2).jpeg';
import placeholder3 from '../../assets/LandingView/HorizontalScroller/placeholder (3).jpeg';
import placeholder4 from '../../assets/LandingView/HorizontalScroller/placeholder (4).jpeg';
import placeholder5 from '../../assets/LandingView/HorizontalScroller/placeholder (5).jpeg';
import placeholder6 from '../../assets/LandingView/HorizontalScroller/placeholder (6).jpeg';

export default function HorizontalScroller() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const hasDuplicated = useRef(false);
    useEffect(() => {
        const scroller = scrollerRef.current;

        if (scroller) {
            if (!hasDuplicated.current) {
                duplicateItems(scroller);
                hasDuplicated.current = true;
            }

            const intervalId = startAnimation(scroller);

            return () => clearInterval(intervalId);
        }
    }, []);

    return (
        <div className='my-2 bg-secondary-250'>
            <div className='gradient-mask'>
                <div className="overflow-hidden">
                    <div className='absolute  text-white w-full h-1/2 flex flex-col gap-6 justify-center items-center'>
                        <h1 className='font-fancy font-bold text-4xl md:text-6xl lg:text-8xl text-center text-shadow-sm tracking-wider z-10'>
                            WZ Snack & Bites
                        </h1>
                        {/* <ProductsButton /> */}
                    </div>
                    <div className="-ml-[10rem] flex w-max scroller gap-2 h-[40rem]" ref={scrollerRef}>
                        <img src={placeholder1} alt="placeholder1" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                        <img src={placeholder2} alt="placeholder2" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                        <img src={placeholder3} alt="placeholder3" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                        <img src={placeholder4} alt="placeholder4" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                        <img src={placeholder5} alt="placeholder5" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                        <img src={placeholder6} alt="placeholder6" className="h-full aspect-[3/6] object-cover rounded" draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// function ProductsButton() {
//   const hoverVariant = {
//     default: { width: "0%" },
//     hover: { width: "100%" },
//   }

//   return (
//     <motion.a className='border bg-[#6C4F32]/75 hover:text-black transition ease-in-out duration-300 shadow-2xl rounded-lg mt-3' href="/products">
//       <motion.div className='relative z-50 aspect-[3/1] h-10 md:h-14 lg:h-20 flex' initial="default" whileHover="hover">
//         <p className='font-clear text-xl md:text-2xl lg:text-4xl text-center m-auto'>Kreasi Kami</p>
//         <motion.div variants={hoverVariant} className='absolute bg-tetriary-500/95 w-10 top-0 bottom-0 z-[-1] rounded-lg'>
//         </motion.div>
//       </motion.div>
//     </motion.a >
//   )
// }

function startAnimation(scroller: HTMLDivElement): number {
    let transformX = 0;
    const totalDuration = 40 * 1000;
    const intervalTime = 25;
    const distanceToMove = 50;

    const intervalId = setInterval(() => {
        transformX += distanceToMove / (totalDuration / intervalTime);

        if (transformX >= distanceToMove) {
            transformX = 0;
        }

        scroller.style.transform = `translateX(${-transformX}%)`;

        if (scroller) {
            scroller.style.transform = `translateX(calc(${-transformX}% - 0.25rem))`;
            const children = Array.from(scroller.children) as HTMLElement[];
            const halfChildrenLength = children.length / 2;
            const shiftFactor = transformX * 2;

            for (let i = 0; i < children.length; i++) {
                const relativePosition = (i * 100) / halfChildrenLength;
                const positionShift = relativePosition - shiftFactor;
                children[i].style.objectPosition = `${positionShift}% 50%`;
            }

        }

    }, intervalTime);

    return intervalId;
}

function duplicateItems(scroller: HTMLDivElement): void {
    const children = Array.from(scroller.children) as HTMLElement[];

    children.forEach((child) => {
        const duplicatedItem = child.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute('aria-hidden', 'true');
        scroller.appendChild(duplicatedItem);
    });
}
