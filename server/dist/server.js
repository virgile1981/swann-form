"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const form_controller_1 = require("./form.controller");
const app = new app_1.default([
    new form_controller_1.FormController(),
], 8081);
app.listen();
