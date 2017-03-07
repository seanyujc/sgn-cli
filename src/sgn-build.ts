#!/usr/bin/env node
// import Promise = require('bluebird')
import fs = require('fs')
import path = require('path')
import program = require('commander')
import template = require('lodash.template')

// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)

program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .parse(process.argv);

console.log(process.env.PWD);

const resourceRoot = path.join(process.env.PWD, '.sgn')
const tplRoot = path.join(resourceRoot, '_tpl')
// page module
if (typeof program.page === 'string') {
    const _moduleTplRoot = path.join(tplRoot, 'pages');

    if (fs.existsSync(_moduleTplRoot)) {
        fs.readdir(_moduleTplRoot, (err, files)=>{
            if(err){
                console.log(err);
                return
            }
            files.forEach((value, index, array) => {
                let _extname = getExtname(value)
                let _pathname = path.join(_moduleTplRoot, value)
                fs.readFile(_pathname, (err, data) => {
                    let content = replaceKeyword(data.toString('utf8'), program.page)
                    let dir = path.join('pages', program.page)
                    writeFile(dir, program.page + _extname, content);
                })
            })
        })
    } else {
        console.log('".sgn" directory isn\'t exists, it\'s root of resource files.')
    }
}

function getExtname(filename: string) {
    const i = filename.indexOf('.')
    return (i < 0) ? "" : filename.substr(i).replace('.tpl', '')
}

// function mkdirs(dirpath: string, callback:any):void;
// function mkdirs(dirpath: string, mode:number, callback:any): void;
function mkdirs(dirpath, mode=0o777, callback?) {
    if(fs.existsSync(dirpath)){
        callback(dirpath)
    }else{
        mkdirs(path.dirname(dirpath), mode, function(){
            fs.mkdirSync(dirpath, mode )
            callback()
        })
    }
}

function replaceKeyword(tpl: string, moduleName: string) {
    let compiled = template(tpl)
    return compiled({ moduleName })
}

function writeFile(dir: string, file: string, data) {
    const srcRoot = path.join(process.env.PWD, '_src/app', dir)
    const filePath = path.join(srcRoot, file)

    if(fs.existsSync(srcRoot) && fs.existsSync(filePath)){
        return;
    }

    if (!fs.existsSync(srcRoot)) {
        mkdirs(srcRoot, 0o777, function(){
            fs.writeFile(filePath, data, { flag: 'a' })
            console.log(`created file: ${filePath}`)
        });
    }else{
        fs.writeFile(filePath, data, { flag: 'a' })
        console.log(`Created file: ${filePath}`)
    }
}

console.log(`Creating ${program.page} module...`);

