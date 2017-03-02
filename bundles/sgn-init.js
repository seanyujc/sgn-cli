#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var download = require("download-git-repo");
console.log('init start!');
program
    .usage('<project-name>')
    .parse(process.argv);
var projectName = program.args[0];
download('seanyujc/sgn-tpl-webpack', projectName, function (err) {
    //   if (err) return done(err);
    //   done();
    err && console.log(err);
});
console.log(projectName);
//# sourceMappingURL=sgn-init.js.map