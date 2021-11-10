import puppeteer from 'puppeteer';
import fs from 'fs'; 

export class FileService {
    savePDF(buffer: Buffer) {
        console.log("savePDF");
        fs.writeFile('monpdf.pdf', buffer, function(err) {
            if (err) {
              return console.log(err);
            }
          });
    }

    public async generatePDF() {

    //We start a new browser, without showing UI
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = 'http://localhost:4200';

    //We load the page, one of my blog post (networkidle0 means we're waiting for the network to stop making new calls for 500ms
    await page.goto(url, {waitUntil: 'networkidle0'});
    //We add style to hide some UI elements we don't want to see on our pdf
    
    /*await page.addStyleTag({ content:
        `header.site-header,
        #cookie-band,
        .post-full-image,
        .post-full-comments,
        .read-next,
        .site-footer { 
        display: none !important;
        }`
    });
*/
    //Let's generate the pdf and close the browser
    const pdf = await page.pdf({ path: "article.pdf", format: 'a4' });
    await browser.close();
    return pdf;
}
}