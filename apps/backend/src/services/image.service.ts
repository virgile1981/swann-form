import sharp from "sharp";
import { FileDTO } from "./dto/file.dto";

export class ImageService {

    constructor() {}

    async resize(width: number,buffer: Buffer): Promise<Buffer> {
        return await sharp(buffer)
        .resize(width)
        .jpeg({ mozjpeg: true })
        .toBuffer()
    }

    async generateThumbnail(image: FileDTO) {
        if(image.buffer) {
            var thumbBuffer = await this.resize(200,Buffer.from(image.buffer,'base64'));
            var thumbnail = new FileDTO();
            thumbnail.type = image.type;
            thumbnail.name = image.name;
            thumbnail.buffer = thumbBuffer.toString('base64');
           return thumbnail;
        }
    }
}