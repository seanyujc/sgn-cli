#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var fs = require("fs");
var path = require("path");
var program = require("commander");
var template = require("lodash.template");
var readdir = Promise.promisify(fs.readdir);
var readFile = Promise.promisify(fs.readFile);
program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);
console.log(process.env.PWD);
var resourceRoot = path.join(process.env.PWD, '.sgn');
var tplRoot = path.join(resourceRoot, '_tpl');
if (typeof program.page === 'string') {
    var _moduleTplRoot_1 = path.join(tplRoot, 'pages');
    if (fs.existsSync(_moduleTplRoot_1)) {
        readdir(_moduleTplRoot_1).then(function (files) {
            files.forEach(function (value, index, array) {
                var _extname = getExtname(value);
                var _pathname = path.join(_moduleTplRoot_1, value);
                fs.readFile(_pathname, function (err, data) {
                    var content = replaceKeyword(data.toString('utf8'), program.page);
                    var file = path.join(program.page, program.page + _extname);
                    writeFile('pages/' + program.page, file, content);
                });
            });
        }).catch(function (err) {
            console.log(err);
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
function replaceKeyword(tpl, moduleName) {
    var compiled = template(tpl);
    return compiled({ moduleName: moduleName });
}
function writeFile(dir, file, data) {
    var srcRoot = path.join(process.env.PWD, '_src/app', dir);
    if (!fs.existsSync(srcRoot)) {
        fs.mkdirSync(srcRoot);
    }
    var filePath = path.join(srcRoot, file);
    if (fs.existsSync(filePath)) {
        return;
    }
    fs.writeFile(filePath, data, { flag: 'a' });
}
console.log("Creating " + program.page + " module...");
//# sourceMappingURL=sgn-build.js.map