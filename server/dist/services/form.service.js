"use strict";
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
class FormService {
    constructor() {
        this.fileService = new file_service_1.FileService();
        this.emailService = new email_service_1.EmailService();
    }
    save(demandeDTO) {
        var _a, _b, _c, _d, _e;
        var self = this;
        var data;
        var partials;
        var html = fs_1.default.readFileSync("./templates/demandeForm.mustache", 'utf8');
        switch (demandeDTO.demande) {
            case "personnelle":
                partials = { demandeForm: fs_1.default.readFileSync("./templates/demandePersonnelleForm.mustache", 'utf8') };
                data = new demandePersonnelle_dto_1.DemandePersonnelleDTO().inject(demandeDTO);
                if ((_a = data.imageEmplacement) === null || _a === void 0 ? void 0 : _a.buffer) {
                    this.emailService.addBase64File(config_1.config.mail.emplacementFilename + ".jpg", data.imageEmplacement.buffer);
                }
                if ((_b = data.imageInspiration) === null || _b === void 0 ? void 0 : _b.buffer) {
                    this.emailService.addBase64File(config_1.config.mail.inspirationFilename + ".jpg", data.imageInspiration.buffer);
                }
                break;
            case "flash":
                partials = { demandeForm: fs_1.default.readFileSync("./templates/demandeFlashForm.mustache", 'utf8') };
                data = new demandeFlash_dto_1.DemandeFlashDTO().inject(demandeDTO);
                if ((_c = data.imageEmplacement) === null || _c === void 0 ? void 0 : _c.buffer) {
                    this.emailService.addBase64File(config_1.config.mail.emplacementFilename + ".jpg", data.imageEmplacement.buffer);
                }
                if ((_d = data.imageFlash) === null || _d === void 0 ? void 0 : _d.buffer) {
                    this.emailService.addBase64File(config_1.config.mail.flashFilename + ".jpg", data.imageFlash.buffer);
                }
                break;
            case "peinture":
                partials = { demandeForm: fs_1.default.readFileSync("./templates/demandePeintureForm.mustache", 'utf8') };
                data = new demandePeinture_dto_1.DemandePeintureDTO().inject(demandeDTO);
                if ((_e = data.imageReference) === null || _e === void 0 ? void 0 : _e.buffer) {
                    this.emailService.addBase64File(config_1.config.mail.referenceFilename + ".jpg", data.imageReference.buffer);
                }
                break;
            default:
                partials = { demandeForm: fs_1.default.readFileSync("./templates/demandeAutreForm.mustache", 'utf8') };
                data = new demandeAutre_dto_1.DemandeAutreDTO().inject(demandeDTO);
                break;
        }
        html = mustache_1.default.render(html, data, partials);
        this.fileService.generatePDF(html, function (err, stream) {
            if (demandeDTO.email != null) {
                self.emailService.addFile(config_1.config.mail.pdfFilename + ".pdf", stream);
                self.emailService.sendEmail(new Array(demandeDTO.email, config_1.config.mail.from));
            }
        });
    }
}
exports.FormService = FormService;
