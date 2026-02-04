import { ReadStream } from 'fs';
// import pdf from 'html-pdf';
import puppeteer from 'puppeteer';
export class FileService {

    public async generatePDF(html: any, callback: (err: Error | null, stream: Uint8Array | null) => void) {
        var options = {
            "margin": {
                "top": "0.25in",            // default is 0, units: mm, cm, in, px
                "right": "0.5in",
                "left": "0.5in"
            }
        };

        // 1. Lancer le navigateur (arguments nécessaires pour Docker)
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Évite le crash "Bus error"
                '--disable-gpu'            // Optionnel mais recommandé sur serveur
            ]
        });

        const page = await browser.newPage();

        // 2. Charger ton contenu HTML
        // waitUntil: 'networkidle0' attend que toutes les images/fonts soient chargées
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // 3. Générer le PDF
        page.pdf({
            format: 'A4',
            printBackground: true, // Pour garder les couleurs et images de fond
            margin: options.margin,
        }).then((buffer) => {
            callback(null, buffer);
        }).catch((error) => {
            callback(error, null);
        }).finally(async () => {
            // 4. Toujours fermer le navigateur pour éviter les fuites de mémoire
            await browser.close();
        })
    }

}