import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

const out = path.join(__dirname, '..', 'dist');
createFolderIfNotExist(out);

let clientDist = path.join(__dirname, '..', '..', 'dist', 'static');

if (fs.existsSync(clientDist)) {
    shell.cp('-R', clientDist, out);
}

function createFolderIfNotExist(outDir: string): void {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
}
