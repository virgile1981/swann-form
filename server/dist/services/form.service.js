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
exports.FormService = void 0;
const config_1 = require("../config");
const email_service_1 = require("./email.service");
const file_service_1 = require("./file.service");
const fs_1 = __importDefault(require("fs"));
const demandePersonnelle_dto_1 = require("./dto/demandePersonnelle.dto");
const mustache_1 = __importDefault(require("mustache"));
const demandeFlash_dto_1 = require("./dto/demandeFlash.dto");
const demandePeinture_dto_1 = require("./dto/demandePeinture.dto");
const demandeAutre_dto_1 = require("./dto/demandeAutre.dto");
const image_service_1 = require("./image.service");
class FormService {
    constructor() {
        this.demandeTemplate = "./templates/demandeForm.mustache";
        this.demandePersonnelleTemplate = "./templates/demandePersonnelleForm.mustache";
        this.demandeFlashTemplate = "./templates/demandeFlashForm.mustache";
        this.demandePeintureTemplate = "./templates/demandePeintureForm.mustache";
        this.demandeAutreTemplate = "./templates/demandeAutreForm.mustache";
        this.fileService = new file_service_1.FileService();
        this.emailService = new email_service_1.EmailService();
        this.imageService = new image_service_1.ImageService();
    }
    save(demandeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            var partials;
            var html = fs_1.default.readFileSync(this.demandeTemplate, 'utf8');
            switch (demandeDTO.demande) {
                case "personnelle":
                    partials = { demandeForm: fs_1.default.readFileSync(this.demandePersonnelleTemplate, 'utf8') };
                    self.data = new demandePersonnelle_dto_1.DemandePersonnelleDTO().inject(demandeDTO);
                    if (self.data.imagesEmplacement) {
                        for (const image of self.data.imagesEmplacement) {
                            if (image === null || image === void 0 ? void 0 : image.buffer) {
                                this.emailService.addBase64File(config_1.config.mail.emplacementFilename + ".jpg", image.buffer);
                                var thumbnail = yield this.imageService.generateThumbnail(image);
                                self.data.imagesEmplacementThumbnail.push(thumbnail);
                            }
                        }
                    }
                    if (self.data.imagesInspiration) {
                        for (const image of self.data.imagesInspiration) {
                            if (image === null || image === void 0 ? void 0 : image.buffer) {
                                this.emailService.addBase64File(config_1.config.mail.inspirationFilename + ".jpg", image.buffer);
                                var thumbnail = yield this.imageService.generateThumbnail(image);
                                self.data.imagesInspirationThumbnail.push(thumbnail);
                            }
                        }
                    }
                    break;
                case "flash":
                    partials = { demandeForm: fs_1.default.readFileSync(this.demandeFlashTemplate, 'utf8') };
                    self.data = new demandeFlash_dto_1.DemandeFlashDTO().inject(demandeDTO);
                    if (self.data.imagesEmplacement) {
                        for (const image of self.data.imagesEmplacement) {
                            if (image === null || image === void 0 ? void 0 : image.buffer) {
                                this.emailService.addBase64File(config_1.config.mail.emplacementFilename + ".jpg", image.buffer);
                                var thumbnail = yield this.imageService.generateThumbnail(image);
                                self.data.imagesEmplacementThumbnail.push(thumbnail);
                            }
                        }
                    }
                    if (self.data.imagesFlash) {
                        for (const image of self.data.imagesFlash) {
                            if (image === null || image === void 0 ? void 0 : image.buffer) {
                                this.emailService.addBase64File(config_1.config.mail.flashFilename + ".jpg", image.buffer);
                                var thumbnail = yield this.imageService.generateThumbnail(image);
                                self.data.imagesFlashThumbnail.push(thumbnail);
                            }
                        }
                    }
                    break;
                case "peinture":
                    partials = { demandeForm: fs_1.default.readFileSync(this.demandePeintureTemplate, 'utf8') };
                    self.data = new demandePeinture_dto_1.DemandePeintureDTO().inject(demandeDTO);
                    if (self.data.imagesReference) {
                        for (const image of self.data.imagesReference) {
                            if (image === null || image === void 0 ? void 0 : image.buffer) {
                                this.emailService.addBase64File(config_1.config.mail.referenceFilename + ".jpg", image.buffer);
                                var thumbnail = yield this.imageService.generateThumbnail(image);
                                self.data.imagesReferenceThumbnail.push(thumbnail);
                            }
                        }
                    }
                    break;
                default:
                    partials = { demandeForm: fs_1.default.readFileSync(this.demandeAutreTemplate, 'utf8') };
                    self.data = new demandeAutre_dto_1.DemandeAutreDTO().inject(demandeDTO);
                    break;
            }
            html = mustache_1.default.render(html, self.data, partials);
            this.fileService.generatePDF(html, function (err, stream) {
                if (demandeDTO.email != null) {
                    self.emailService.addFile(config_1.config.mail.pdfFilename + ".pdf", stream);
                    self.emailService.sendEmail(new Array(demandeDTO.email, config_1.config.mail.from));
                }
            });
        });
    }
}
exports.FormService = FormService;
