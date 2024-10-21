declare module 'colorthief' {
  export default class ColorThief {
    getColor(
      image: HTMLImageElement | null,
      quality?: number
    ): [number, number, number];
    getPalette(
      image: HTMLImageElement | null,
      colorCount?: number,
      quality?: number
    ): [number, number, number][];
  }
}
