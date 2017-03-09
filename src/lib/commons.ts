import fs = require('fs')
import path = require('path')
import template = require('lodash.template')

/**
 * 
 * @param dirpath 
 * @param mode 
 * @param callback 
 */
export function mkdirs(dirpath: string, mode: number, callback?: Function) {
    if (fs.existsSync(dirpath)) {
        callback(dirpath)
    } else {
        mkdirs(path.dirname(dirpath), mode, function () {
            fs.mkdirSync(dirpath, mode)
            callback()
        })
    }
}

export function getExtname(filename: string) {
    const i = filename.indexOf('.')
    return (i < 0) ? "" : filename.substr(i).replace('.tpl', '')
}

/**
 * 
 * @param tplContent 
 * @param moduleName 
 */
export function replaceKeyword(tplContent: string, moduleName: string) {
    let compiled = template(tplContent)
    return compiled({ moduleName })
}


export function writeFile(dir: string, file: string, data) {
    const srcRoot = path.join(process.env.PWD, 'src/app', dir)
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
