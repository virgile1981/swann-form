"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandeAutreDTO = void 0;
const demande_dto_1 = require("./demande.dto");
class DemandeAutreDTO extends demande_dto_1.DemandeDTO {
    inject(demandeAutreDTO) {
        super.inject(demandeAutreDTO);
        this.descriptif = demandeAutreDTO.descriptif;
        return this;
    }
}
exports.DemandeAutreDTO = DemandeAutreDTO;
