import { useEffect, useRef, useCallback, useMemo } from 'react';

// Assuming you'll keep the image imports the same
import placeholder1 from '../../../../assets/LandingView/HorizontalScroller/placeholder (1).jpeg';
import placeholder2 from '../../../../assets/LandingView/HorizontalScroller/placeholder (2).jpeg';
import placeholder3 from '../../../../assets/LandingView/HorizontalScroller/placeholder (3).jpeg';
import placeholder4 from '../../../../assets/LandingView/HorizontalScroller/placeholder (4).jpeg';
import placeholder5 from '../../../../assets/LandingView/HorizontalScroller/placeholder (5).jpeg';
import placeholder6 from '../../../../assets/LandingView/HorizontalScroller/placeholder (6).jpeg';

export default function HorizontalScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasDuplicated = useRef(false);

  // Memoize the images to prevent unnecessary re-renders
  const placeholderImages = useMemo(() => [
    placeholder1, placeholder2, placeholder3,
    placeholder4, placeholder5, placeholder6
  ], []);

  // Use useCallback to memoize the animation functions
  const duplicateItems = useCallback((scroller: HTMLDivElement) => {
    const children = Array.from(scroller.children) as HTMLElement[];

    // Use a document fragment for more efficient DOM manipulation
    const fragment = document.createDocumentFragment();

    children.forEach((child) => {
      const duplicatedItem = child.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      fragment.appendChild(duplicatedItem);
    });

    scroller.appendChild(fragment);
  }, []);

  const startAnimation = useCallback((scroller: HTMLDivElement) => {
    let transformX = 0;
    const totalDuration = 40 * 1000;
    const intervalTime = 25;
    const distanceToMove = 50;

    // Use requestAnimationFrame for smoother animations
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;

      // Calculate movement based on elapsed time
      transformX += (distanceToMove / (totalDuration / intervalTime)) * (deltaTime / intervalTime);

      if (transformX >= distanceToMove) {
        transformX = 0;
      }

      // More efficient transform and object position calculations
      const negativeTransform = -transformX;
      scroller.style.transform = `translateX(calc(${negativeTransform}% - 0.25rem))`;

      const children = Array.from(scroller.children) as HTMLElement[];
      const halfChildrenLength = children.length / 2;
      const shiftFactor = transformX * 2;

      children.forEach((child, i) => {
        const relativePosition = (i * 100) / halfChildrenLength;
        const positionShift = relativePosition - shiftFactor;
        child.style.objectPosition = `${positionShift}% 50%`;
      });

      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Return a cleanup function that cancels the animation frame
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (scroller) {
      if (!hasDuplicated.current) {
        duplicateItems(scroller);
        hasDuplicated.current = true;
      }

      // Use the new animation method with requestAnimationFrame
      const stopAnimation = startAnimation(scroller);

      // Cleanup function
      return () => {
        stopAnimation();
      };
    }
  }, [duplicateItems, startAnimation]);

  return (
    <div className='my-2 bg-secondary-250'>
      <div className='gradient-mask'>
        <div className="overflow-hidden">
          <div className='absolute text-white w-full h-1/2 flex flex-col gap-6 justify-center items-center'>
            <h1 className='font-fancy font-bold text-4xl md:text-6xl lg:text-8xl text-center text-shadow-sm tracking-widest z-10'>
              Kuenya WZ
            </h1>
          </div>
          <div
            className="-ml-[10rem] flex w-max scroller gap-2 h-[20rem] sm:h-[30rem] lg:h-[40rem]"
            ref={scrollerRef}
          >
            {placeholderImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`placeholder${index + 1}`}
                className="h-full aspect-[3/6] object-cover rounded"
                draggable="false"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}