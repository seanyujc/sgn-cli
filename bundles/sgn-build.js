#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var pages = require("./lib/pages");
// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)
program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .option('--route-path [route-path]', "The path of config file")
    .parse(process.argv);
// console.log(process.env.PWD);
// page module
if (typeof program.page === 'string') {
    console.log("Creating " + program.page + " module...");
    pages.createFile(program.page);
    pages.writeConfig(program.page);
}
//# sourceMappingURL=sgn-build.js.map