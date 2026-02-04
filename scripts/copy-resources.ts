import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

const out = path.join(__dirname, '..', 'dist');
createFolderIfNotExist(out);

let frontendDist = path.join(__dirname, '..', 'apps', 'frontend', 'dist', 'static');
let backendDist = path.join(__dirname, '..', 'apps', 'backend', 'dist');
let template = path.join(__dirname, '..', 'apps', 'backend', 'templates');


if (fs.existsSync(frontendDist)) {
    shell.cp('-R', frontendDist, out);
} else {
    console.log(frontendDist + " doesn't exist")
}

if (fs.existsSync(backendDist)) {
    shell.cp('-R', path.join(backendDist, '*'), out);
} else {
    console.log(backendDist + " doesn't exist")
}

if (fs.existsSync(template)) {
    shell.cp('-R', template, out);
} else {
    console.log(template + " doesn't exist")
}

function createFolderIfNotExist(outDir: string): void {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
}
