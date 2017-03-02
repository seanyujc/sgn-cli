#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var program = require("commander");
program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);
var resourceRoot = path.join(__dirname, '.sgn');
var tplRoot = path.join(resourceRoot, '_tpl');
if (typeof program.page === 'string') {
    var _moduleTplRoot = path.join(tplRoot, 'page');
    fs.readdir(_moduleTplRoot, function (err, files) {
        console.log(err);
        console.log(files);
        // files.forEach((value, index, array)=>{
        //     console.log(value)
        //     console.log(array)
        // })
    });
}
console.log(program.page);
console.log(resourceRoot);
//# sourceMappingURL=sgn-build.js.map