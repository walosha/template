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
exports.buildProject = void 0;
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const ncp = util_1.default.promisify(require('ncp').ncp);
const templateFile = (fileName, replacements) => {
    const fileContent = fs_1.default.readFileSync(fileName, 'utf8').toString();
    const template = Object.entries(replacements).reduce((acc, [key, value]) => {
        var _a;
        return acc.replace(new RegExp(`(\{\{${key}\}\}|\{\{ ${key} \}\})`, 'g'), (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : '');
    }, fileContent);
    fs_1.default.writeFileSync(fileName, template);
};
// required for npm publish
const renameGitignore = (projectName) => {
    if (fs_1.default.existsSync(path_1.default.normalize(`${projectName}/gitignore`))) {
        fs_1.default.renameSync(path_1.default.normalize(`${projectName}/gitignore`), path_1.default.normalize(`${projectName}/.gitignore`));
    }
};
const buildProfiler = ({ type, framework, language, name, css, port, }) => {
    const profiler = {
        NAME: name,
        FRAMEWORK: framework,
        SAFE_NAME: name.replace(/-/g, '_').trim(),
        LANGUAGE: language === 'typescript' ? 'TypeScript' : 'JavaScript',
    };
    if (type === 'API Server' || type === 'Application') {
        profiler.PORT = port;
    }
    if (type === 'Application') {
        const isTailwind = css === 'Tailwind';
        profiler.CSS_EXTENSION = isTailwind ? 'scss' : 'css';
        profiler.CONTAINER = isTailwind
            ? 'mt-10 text-3xl mx-auto max-w-6xl'
            : 'container';
        profiler.CSS = isTailwind ? 'Tailwind' : 'Empty CSS';
    }
    return profiler;
};
// Options:
//   - type: "Application", "Library", "Server"
//   - name: Name of the project
//   - framework: Name of the framework
//   - language: Language of the project
//   - css: CSS framework
//   - port: Port to run the project on
const buildProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, name, framework, type } = project;
    const lang = language === 'typescript' ? 'ts' : 'js';
    const tempDir = type.toLowerCase();
    const profiler = buildProfiler(project);
    switch (type) {
        case 'Library':
            yield ncp(path_1.default.join(__dirname, `../templates/${tempDir}/typescript`), project.name);
            break;
        case 'API Server':
            yield ncp(path_1.default.join(__dirname, `../templates/${tempDir}/${framework}`), name);
            break;
        case 'Application':
            {
                yield ncp(path_1.default.join(__dirname, `../templates/${tempDir}/${framework}/base`), name);
                yield ncp(path_1.default.join(__dirname, `../templates/${tempDir}/${framework}/${lang}`), name);
                if (profiler.CSS_EXTENSION === 'scss') {
                    fs_1.default.unlinkSync(path_1.default.normalize(`${name}/src/index.css`));
                    yield ncp(path_1.default.join(__dirname, '../templates/application-extras/tailwind'), name);
                    const packageJSON = JSON.parse(fs_1.default.readFileSync(path_1.default.join(name, 'package.json'), 'utf8'));
                    packageJSON.devDependencies.tailwindcss = '^2.0.2';
                    fs_1.default.writeFileSync(path_1.default.join(name, 'package.json'), JSON.stringify(packageJSON, null, 2));
                }
            }
            break;
    }
    renameGitignore(name);
    glob_1.default.sync(`${name}/**/*`).forEach((file) => {
        if (fs_1.default.lstatSync(file).isFile()) {
            templateFile(file, profiler);
        }
    });
});
exports.buildProject = buildProject;
