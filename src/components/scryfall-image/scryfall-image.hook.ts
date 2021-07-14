import mapImageToHeight from './scryfall-image.util.map-image-to-height';
import mapImageToWidth from './scryfall-image.util.map-image-to-width';

interface Props {
  readonly scryfallId: string;
  readonly image:
    | 'art_crop'
    | 'border_crop'
    | 'large'
    | 'normal'
    | 'png'
    | 'small';
}

interface State {
  height?: number;
  src: string;
  width?: number;
}

const FIRST_CHARACTER = 0;
const SECOND_CHARACTER = 1;
const SINGLE_CHARACTER = 1;

export default function useScryfallImage({ image, scryfallId }: Props): State {
  const srcDir1: string = scryfallId.substr(FIRST_CHARACTER, SINGLE_CHARACTER);
  const srcDir2: string = scryfallId.substr(SECOND_CHARACTER, SINGLE_CHARACTER);

  return {
    height: mapImageToHeight(image),
    src: `https://c1.scryfall.com/file/scryfall-cards/${image}/front/${srcDir1}/${srcDir2}/${scryfallId}.jpg`,
    width: mapImageToWidth(image),
  };
}
