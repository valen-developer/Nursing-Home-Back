import { IImageResizer } from '../domain/interfaces/IimageResizer.interface';

import sharp, { SharpOptions } from 'sharp';

export class SharpImageResizer implements IImageResizer {
  constructor() {}

  async resize(image: SharpOptions, width: number, height: number): Promise<any> {
    return new Promise((resolve, reject) => {
      sharp(image).resize(width, height).toBuffer();
    });
  }
}
