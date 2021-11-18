import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

const out = path.join(__dirname, '..', 'dist');
createFolderIfNotExist(out);

let clientDist = path.join(__dirname, '..', '..', 'dist', 'static');
let template = path.join(__dirname,'..','templates');
let ssl = path.join(__dirname,'..','ssl');

if (fs.existsSync(clientDist)) {
    shell.cp('-R', clientDist, out);
}

if (fs.existsSync(template)) {
    shell.cp('-R', template, out);
}

if (fs.existsSync(ssl)) {
    shell.cp('-R', ssl, out);
}

function createFolderIfNotExist(outDir: string): void {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
}
