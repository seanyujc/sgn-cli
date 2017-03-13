#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var pages = require("./lib/pages");
var services = require("./lib/services");
// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)
program
    .usage('[entry]')
    .option('-p,--page [page-name]', 'create page module')
    .option('-s,--service [service-name]', 'create service module')
    .option('-f,--fun [method-name]', "method name")
    .parse(process.argv);
// console.log(process.env.PWD);
console.log(__dirname);
// page module
if (typeof program.page === 'string') {
    console.log("Creating " + program.page + " module...");
    pages.createFile(program.page);
    pages.writeConfig(program.page);
}
if (typeof program.service === 'string' && typeof program.fun === 'undefined') {
    services.createFile(program.service);
    services.writeConfig(program.service);
}
if (typeof program.service === 'string' && typeof program.fun === 'string') {
    services.addFunction(program.service, program.fun);
}
//# sourceMappingURL=sgn-build.js.map