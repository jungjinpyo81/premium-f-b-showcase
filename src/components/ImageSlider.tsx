import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  images: { src: string; alt: string }[];
  interval?: number;
  className?: string;
};

export function ImageSlider({ images, interval = 2000, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % images.length) + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [interval, images.length]);

  return (
    <div className={className}>
      <div className="relative aspect-video w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`이미지 ${i + 1}`}
            onClick={() => go(i)}
            className={`h-px transition-all duration-300 ${
              i === index ? "w-10 bg-foreground" : "w-6 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
