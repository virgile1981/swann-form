

export const config ={ 
    mail: {
        from: "contact@cdpt.fr",
        subject: "Demande de Projet Artistique", 
        content: "<html><body><p>(Ceci est un message automatique) <br><br>"+
        "Merci d’avoir pris le temps de remplir ce formulaire. Je te ferais un retour à ce mail après l’étude de ta demande.<br><br>"+
        "À bientôt,<br>"+
        "Swann</p></body></html>",
        emplacementFilename: "emplacement",
        inspirationFilename: "inspiration",
        flashFilename: "flash",
        referenceFilename: "reference",
        pdfFilename:"formulaire",
        host: "mail.cdpt.fr",
        port: 465,
        secure: true,
        username: "contact@cdpt.fr",
        password: "mit05Poth2"
    }
};

