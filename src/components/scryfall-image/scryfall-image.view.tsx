import type { ReactElement } from 'react';
import useScryfallImage from './scryfall-image.hook';

interface Props {
  readonly alt?: string;
  readonly children: string;
  readonly className?: string;
  readonly image:
    | 'art_crop'
    | 'border_crop'
    | 'large'
    | 'normal'
    | 'png'
    | 'small';
}

export default function ScryfallImage({
  alt,
  children: scryfallId,
  className,
  image,
}: Props): ReactElement {
  const { height, src, width } = useScryfallImage({ image, scryfallId });

  return (
    <img
      alt={alt}
      className={className}
      height={height}
      src={src}
      width={width}
    />
  );
}
