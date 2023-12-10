import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import * as fs from "node:fs/promises";

@Injectable()
export class ImageService {
  async resize(file: Express.Multer.File): Promise<Buffer> {
    return sharp(file.buffer).resize({ width: 256 }).toBuffer();
  }

  async saveTemporary(file: Buffer): Promise<string> {
    const tempPath = `${__dirname}/tempFile.jpg`;
    await fs.writeFile(tempPath, file);
    return tempPath;
  }
}
