const os = require('os');
import fs = require('fs')
import path = require('path')
import template = require('lodash.template')

export function endl(){
  return os.EOL;
}

export function currentPath (){
  return process.env.PWD || process.cwd();
}

export function lowerFirst(str: string) {
  let first = str.substr(0, 1).toLocaleLowerCase()
  let surplus = str.substr(1, str.length);
  return first + surplus;
}
export function upperFirst(str: string) {
  let first = str.substr(0, 1).toLocaleUpperCase()
  let surplus = str.substr(1, str.length);
  return first + surplus;
}
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
  const ufModuleName = upperFirst(moduleName)
  return compiled({ moduleName, ufModuleName })
}

export function writeFile(basePath: string, file: string, data) {
  // const srcRoot = path.join(commons.currentPath(),  dir)
  const filePath = path.join(basePath, file)

  if (fs.existsSync(basePath) && fs.existsSync(filePath)) {
    return;
  }

  if (!fs.existsSync(basePath)) {
    mkdirs(basePath, 0o777, function () {
      fs.writeFile(filePath, data, { flag: 'a' })
      console.log(`created file: ${filePath}`)
    });
  } else {
    fs.writeFile(filePath, data, { flag: 'a' })
    console.log(`Created file: ${filePath}`)
  }
}
