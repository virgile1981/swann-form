"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//import https from 'https';
const bodyParser = __importStar(require("body-parser"));
class App {
    constructor(controllers, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
        this.app.use(bodyParser.json({ limit: '35mb' }));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }
    listen() {
        var options = {
            key: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'ssl', 'server.key'), 'utf8'),
            cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'ssl', 'server.cert'), 'utf8')
        };
        /* https.createServer(options, this.app).listen(this.port, () => {
          console.log(`App https listening on the port ${this.port}`);
        });*/
        this.app.listen(this.port, () => {
            console.log(`App http listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
