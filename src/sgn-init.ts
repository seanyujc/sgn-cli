#!/usr/bin/env node
import program = require('commander')
import download = require('download-git-repo')

console.log('init start!')

program
    .usage('<project-name>')
    .parse(process.argv);
const projectName = program.args[0];

download('seanyujc/sgn-tpl-webpack', projectName, function(err) {
//   if (err) return done(err);
//   done();
    err && console.log(err);
})

console.log(projectName);
