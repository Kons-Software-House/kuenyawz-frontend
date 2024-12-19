import React, { useState, useEffect, useRef } from 'react';

import { retrieveProductImage } from "../../../services/ImageApiService";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  draggable?: "true" | "false";
  onLoad?: () => void;
};

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, draggable, onLoad }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<undefined | string>(undefined);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isVisible) {
      const fetchImage = async () => {
        try {
          const response = await retrieveProductImage(src);
          setImageSrc(response);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      fetchImage();
    }
  }, [isVisible, src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc || undefined}
      alt={alt}
      className={className}
      loading="lazy"
      draggable={draggable}
      onLoad={handleImageLoad}
    />
  );
};

export default LazyImage;