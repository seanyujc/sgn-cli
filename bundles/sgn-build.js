#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var program = require("commander");
var template = require("lodash.template");
// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)
program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);
console.log(process.env.PWD);
var resourceRoot = path.join(process.env.PWD, '.sgn');
var tplRoot = path.join(resourceRoot, '_tpl');
// page module
if (typeof program.page === 'string') {
    var _moduleTplRoot_1 = path.join(tplRoot, 'pages');
    if (fs.existsSync(_moduleTplRoot_1)) {
        fs.readdir(_moduleTplRoot_1, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach(function (value, index, array) {
                var _extname = getExtname(value);
                var _pathname = path.join(_moduleTplRoot_1, value);
                fs.readFile(_pathname, function (err, data) {
                    var content = replaceKeyword(data.toString('utf8'), program.page);
                    var dir = path.join('pages', program.page);
                    writeFile(dir, program.page + _extname, content);
                });
            });
        });
    }
    else {
        console.log('".sgn" directory isn\'t exists, it\'s root of resource files.');
    }
}
function getExtname(filename) {
    var i = filename.indexOf('.');
    return (i < 0) ? "" : filename.substr(i).replace('.tpl', '');
}
// function mkdirs(dirpath: string, callback:any):void;
// function mkdirs(dirpath: string, mode:number, callback:any): void;
function mkdirs(dirpath, mode, callback) {
    if (mode === void 0) { mode = 511; }
    if (fs.existsSync(dirpath)) {
        callback(dirpath);
    }
    else {
        mkdirs(path.dirname(dirpath), mode, function () {
            fs.mkdirSync(dirpath, mode);
            callback();
        });
    }
}
function replaceKeyword(tpl, moduleName) {
    var compiled = template(tpl);
    return compiled({ moduleName: moduleName });
}
function writeFile(dir, file, data) {
    var srcRoot = path.join(process.env.PWD, '_src/app', dir);
    var filePath = path.join(srcRoot, file);
    if (fs.existsSync(srcRoot) && fs.existsSync(filePath)) {
        return;
    }
    if (!fs.existsSync(srcRoot)) {
        mkdirs(srcRoot, 511, function () {
            fs.writeFile(filePath, data, { flag: 'a' });
            console.log("created file: " + filePath);
        });
    }
    else {
        fs.writeFile(filePath, data, { flag: 'a' });
        console.log("Created file: " + filePath);
    }
}
console.log("Creating " + program.page + " module...");
//# sourceMappingURL=sgn-build.js.map