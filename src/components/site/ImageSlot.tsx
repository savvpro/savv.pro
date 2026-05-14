import Image from "next/image";
import { getImage } from "@/lib/images";

type Props = {
  id: string;
  ratio?: "16/9" | "4/5" | "1/1" | "3/4" | "5/4";
  prompt: string;
  caption?: string;
  className?: string;
};

const RATIO_CLASS: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
};

const RATIO_SIZE: Record<NonNullable<Props["ratio"]>, { w: number; h: number }> = {
  "16/9": { w: 1920, h: 1080 },
  "4/5": { w: 1200, h: 1500 },
  "1/1": { w: 1200, h: 1200 },
  "3/4": { w: 1200, h: 1600 },
  "5/4": { w: 1500, h: 1200 },
};

export function ImageSlot({ id, ratio = "4/5", prompt, caption, className = "" }: Props) {
  const src = getImage(id);
  const ratioClass = RATIO_CLASS[ratio];
  const size = RATIO_SIZE[ratio];

  if (src) {
    return (
      <figure
        className={`imgslot-has-image relative ${ratioClass} ${className} overflow-hidden bg-[var(--paper-warm)]`}
        aria-label={caption ?? id}
      >
        <Image
          src={src}
          alt={caption ?? id}
          width={size.w}
          height={size.h}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1400px"
          priority={id === "hero"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>
    );
  }

  return (
    <figure className={`imgslot ${ratioClass} ${className}`} aria-label={`Image slot ${id}`}>
      <div className="imgslot-label">▸ img · {id}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="text-ink-soft italic-serif text-xl sm:text-2xl"
          style={{ lineHeight: 1.25 }}
        >
          {caption ?? "Image to be generated"}
        </div>
        <div
          className="mt-3 text-muted text-[0.65rem] tracking-[0.18em] uppercase font-mono max-w-[28ch]"
          style={{ lineHeight: 1.5 }}
          aria-hidden
        >
          {prompt.slice(0, 110)}
          {prompt.length > 110 ? "…" : ""}
        </div>
      </div>
      <div
        className="absolute bottom-2 right-2 text-muted text-[0.6rem] tracking-[0.18em] uppercase font-mono"
        aria-hidden
      >
        {ratio}
      </div>
    </figure>
  );
}
