export interface CarouselImages {
  id: number;
  src: string;
  alt: string;
}

export interface Carousel {
  images: CarouselImages[];
  interval: number;
}
