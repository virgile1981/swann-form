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
class FormService {
    constructor() {
        this.fileService = new file_service_1.FileService();
        this.emailService = new email_service_1.EmailService();
    }
    save(demandeDTO) {
        var self = this;
        var data;
        var partials;
        var html = fs_1.default.readFileSync("../../templates/demandeForm.mustache", 'utf8');
        switch (demandeDTO.demande) {
            case "personnelle":
                partials = { demandeForm: fs_1.default.readFileSync("./templates/demandePersonnelleForm.mustache", 'utf8') };
                data = new demandePersonnelle_dto_1.DemandePersonnelleDTO().inject(demandeDTO);
                if (data.imageEmplacement != null) {
                    this.emailService.addBase64File(config_1.config.mail.emplacementFilename + ".jpg", data.imageEmplacement);
                }
                if (data.imageInspiration != null) {
                    this.emailService.addBase64File(config_1.config.mail.inspirationFilename + ".jpg", data.imageInspiration);
                }
                break;
            case "flash":
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
