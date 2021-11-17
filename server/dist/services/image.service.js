"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const sharp_1 = __importDefault(require("sharp"));
const file_dto_1 = require("./dto/file.dto");
class ImageService {
    constructor() { }
    resize(width, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, sharp_1.default)(buffer)
                .resize(width)
                .jpeg({ mozjpeg: true })
                .toBuffer();
        });
    }
    generateThumbnail(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (image.buffer) {
                var thumbBuffer = yield this.resize(200, Buffer.from(image.buffer, 'base64'));
                var thumbnail = new file_dto_1.FileDTO();
                thumbnail.type = image.type;
                thumbnail.name = image.name;
                thumbnail.buffer = thumbBuffer.toString('base64');
                return thumbnail;
            }
        });
    }
}
exports.ImageService = ImageService;
