#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import program = require('commander')

program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);

const resourceRoot = path.join(__dirname, '.sgn')
const tplRoot = path.join(resourceRoot, '_tpl')
if (typeof program.page === 'string') {
    const _moduleTplRoot = path.join(tplRoot, 'page');
    fs.readdir(_moduleTplRoot, (err, files)=>{
        console.log(err)
        console.log(files)
        // files.forEach((value, index, array)=>{
        //     console.log(value)
        //     console.log(array)
        // })
    })
}

console.log(program.page);
console.log(resourceRoot);
