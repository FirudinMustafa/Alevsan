import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";

/** ImageCard ve ProductGallery kartlarının ortak içeriği. */
export function CardBody({
  title,
  text,
  image,
  aspect,
  titleSize,
  showArrow,
  photoCount,
}: {
  title: string;
  text: string;
  image: string;
  aspect: string;
  titleSize: string;
  showArrow: boolean;
  photoCount?: number;
}) {
  return (
    <>
      <div className={`relative ${aspect} overflow-hidden`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
        {photoCount && (
          <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-medium text-text backdrop-blur">
            <Images className="h-3.5 w-3.5 text-copper" strokeWidth={1.8} /> {photoCount} fotoğraf
          </span>
        )}
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 p-5 text-left">
        <div>
          <h3 className={`font-display ${titleSize} font-semibold`}>{title}</h3>
          <p className="mt-1.5 text-sm text-muted">{text}</p>
        </div>
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0 text-copper transition group-hover:translate-x-1" />}
      </div>
    </>
  );
}
