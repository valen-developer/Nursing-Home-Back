export abstract class IImageResizer {
  abstract resize(image: any, width: number, height: number): Promise<Buffer>;
}
