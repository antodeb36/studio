import data from './placeholder-images.json';

export type StockImage = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  color: string;
  width: number;
  height: number;
};

export const images: StockImage[] = data.placeholderImages;

export function getImageById(id: string | number): StockImage | undefined {
  return images.find(image => image.id === String(id));
}
