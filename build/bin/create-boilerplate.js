#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const shelljs_1 = __importDefault(require("shelljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../src/index");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                message: 'Pick the name of your app:',
                name: 'name',
                default: 'playground',
            },
            {
                type: 'list',
                message: 'Project Type:',
                name: 'type',
                choices: ['Application', 'API Server', 'Library'],
                default: 'Application',
            },
        ]);
        if (answers.type === 'Library') {
            (0, index_1.buildProject)(answers);
        }
        if (answers.type === 'API Server') {
            const templates = fs_1.default
                .readdirSync(path_1.default.join(__dirname, '../templates/server'))
                .sort();
            const serverAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    message: 'Port number:',
                    name: 'port',
                    default: '7070',
                },
                {
                    type: 'list',
                    message: 'Template:',
                    name: 'framework',
                    choices: templates,
                    default: 'express',
                },
            ]);
            (0, index_1.buildProject)(Object.assign(Object.assign(Object.assign({}, answers), serverAnswers), { language: 'typescript' }));
        }
        if (answers.type === 'Application') {
            const templates = fs_1.default
                .readdirSync(path_1.default.join(__dirname, '../templates/application'))
                .sort();
            const appAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    message: 'Port number:',
                    name: 'port',
                    default: '8080',
                },
                {
                    type: 'list',
                    message: 'Framework:',
                    name: 'framework',
                    choices: templates,
                    default: 'react',
                },
                {
                    type: 'list',
                    message: 'Language:',
                    name: 'language',
                    choices: ['typescript', 'javascript'],
                    default: 'javascript',
                },
                {
                    type: 'list',
                    message: 'CSS:',
                    name: 'css',
                    choices: ['CSS', 'Tailwind'],
                    default: 'CSS',
                },
            ]);
            (0, index_1.buildProject)(Object.assign(Object.assign({}, answers), appAnswers));
        }
        shelljs_1.default.echo(`Your '${answers.name}' project is ready to go.

Next steps:

▶️ cd ${answers.name}
▶️ npm install
▶️ npm start
`);
    });
})();
