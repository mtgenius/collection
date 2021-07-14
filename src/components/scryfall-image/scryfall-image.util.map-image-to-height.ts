const BORDER_CROP_HEIGHT = 680;
const LARGE_HEIGHT = 936;
const NORMAL_HEIGHT = 680;
const PNG_HEIGHT = 1040;
const SMALL_HEIGHT = 204;

export default function mapImageToHeight(
  image: 'art_crop' | 'border_crop' | 'large' | 'normal' | 'png' | 'small',
): number | undefined {
  switch (image) {
    case 'art_crop':
      return;
    case 'border_crop':
      return BORDER_CROP_HEIGHT;
    case 'large':
      return LARGE_HEIGHT;
    case 'normal':
      return NORMAL_HEIGHT;
    case 'png':
      return PNG_HEIGHT;
    case 'small':
      return SMALL_HEIGHT;
  }
}
