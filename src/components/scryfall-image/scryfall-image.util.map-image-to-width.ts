const BORDER_CROP_WIDTH = 480;
const LARGE_WIDTH = 672;
const NORMAL_WIDTH = 488;
const PNG_WIDTH = 745;
const SMALL_WIDTH = 146;

export default function mapImageToWidth(
  image: 'art_crop' | 'border_crop' | 'large' | 'normal' | 'png' | 'small',
): number | undefined {
  switch (image) {
    case 'art_crop':
      return;
    case 'border_crop':
      return BORDER_CROP_WIDTH;
    case 'large':
      return LARGE_WIDTH;
    case 'normal':
      return NORMAL_WIDTH;
    case 'png':
      return PNG_WIDTH;
    case 'small':
      return SMALL_WIDTH;
  }
}
