import React, { useState, useEffect, useRef } from 'react';

import { retrieveProductImage } from "../../../services/ImageApiService";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  draggable?: "true" | "false";
};

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, draggable }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
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

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      draggable={draggable}
    />
  );
};

export default LazyImage;