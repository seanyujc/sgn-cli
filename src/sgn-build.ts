#!/usr/bin/env node
import Promise = require('bluebird')
import fs = require('fs')
import path = require('path')
import program = require('commander')
import template = require('lodash.template')

const readdir = Promise.promisify(fs.readdir)
const readFile = Promise.promisify(fs.readFile)

program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);

console.log(process.env.PWD);

const resourceRoot = path.join(process.env.PWD, '.sgn')
const tplRoot = path.join(resourceRoot, '_tpl')
if (typeof program.page === 'string') {
    const _moduleTplRoot = path.join(tplRoot, 'pages');

    if (fs.existsSync(_moduleTplRoot)) {
        readdir(_moduleTplRoot).then((files) => {
            files.forEach((value, index, array) => {
                let _extname = getExtname(value)
                let _pathname = path.join(_moduleTplRoot, value)
                fs.readFile(_pathname, (err, data) => {
                    let content = replaceKeyword(data.toString('utf8'), program.page)
                    let file = path.join(program.page, program.page + _extname)
                    writeFile('pages/'+program.page, file, content);
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    } else {
        console.log('".sgn" directory isn\'t exists, it\'s root of resource files.')
    }

}

function getExtname(filename: string) {
    const i = filename.indexOf('.')
    return (i < 0) ? "" : filename.substr(i).replace('.tpl', '')
}

function replaceKeyword(tpl: string, moduleName: string) {
    let compiled = template(tpl)
    return compiled({ moduleName })
}

function writeFile(dir: string, file: string, data) {
    const srcRoot = path.join(process.env.PWD, '_src/app' , dir)
    if (!fs.existsSync(srcRoot)) {
        fs.mkdirSync(srcRoot)
    }
    const filePath = path.join(srcRoot, file)
    if (fs.existsSync(filePath)) {
        return;
    }
    fs.writeFile(filePath, data, { flag: 'a' })
}

console.log(`Creating ${program.page} module...`);

