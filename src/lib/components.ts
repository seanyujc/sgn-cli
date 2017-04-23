import fs = require('fs')
import path = require('path')

import * as commons from './commons';
import * as config from './config';

const COMP_CONF_PATH = path.join(process.env.PWD, "src/app/index.components.ts");
const COMP_CONF_ANCHOR_1 = "// XBP-NC1-CONFIG-NO-DELETE";
const COMP_CONF_ANCHOR_2 = "// XBP-NC2-CONFIG-NO-DELETE";
const MODULE_TPL_ROOT = path.join(config.TPL_ROOT, 'components');

export function createFile(itemName: string) {
  if (!fs.existsSync(MODULE_TPL_ROOT)) {
    console.error(`directory isn\'t exists: ${MODULE_TPL_ROOT}`);
    return;
  }

  fs.readdir(MODULE_TPL_ROOT, (err, files) => {
    if (err) {
      console.error(err);
      return
    }
    files.forEach((fileName, index, array) => {
      let _extname = commons.getExtname(fileName)
      let _pathName = path.join(MODULE_TPL_ROOT, fileName)
      fs.readFile(_pathName, (err, data) => {
        let content = commons.replaceKeyword(data.toString('utf8'), itemName)
        let basePath = path.join(process.env.PWD, 'src/app/components', itemName)
        commons.writeFile(basePath, itemName + _extname, content);
      })
    })
  })
}

export function removeFile(itemName: string) {
  if (!fs.existsSync(MODULE_TPL_ROOT)) {
    console.error('".sgn" directory isn\'t exists, it\'s root of resource files.');
    return;
  }
  fs.readdir(MODULE_TPL_ROOT, (err, files) => {
    if (err) {
      console.error(err);
      return
    }
    files.forEach((fileName, index, array) => {
      let _extname = commons.getExtname(fileName)
      let filePath = path.join(process.env.PWD, 'src/app/components', itemName, itemName + _extname)
      fs.unlinkSync(filePath)
      console.log(`file "${filePath}" is removed`)
    })
    fs.rmdir(path.join(process.env.PWD, 'src/app/components', itemName));
  })
}

export function writeConfig(itemName: string) {
  if (!fs.existsSync(COMP_CONF_PATH)) {
    console.error('Route config file not find!');
    return;
  }

  const CONFIG_1 = `// '${itemName}' CONFIG 1 START
import ${itemName}Module from './components/${itemName}/${itemName}.module';
// '${itemName}' CONFIG 1 END`;
  const CONFIG_2 = `  // '${itemName}' CONFIG 2 START
  ${itemName}Module.name,
  // '${itemName}' CONFIG 2 END`;

  fs.readFile(COMP_CONF_PATH, (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    let fileContent = data.toString();
    let reg1 = new RegExp(COMP_CONF_ANCHOR_1);
    let reg2 = new RegExp(COMP_CONF_ANCHOR_2);
    let start1 = fileContent.search(reg1);
    let start2 = fileContent.search(reg2);
    if (start1 === -1 || start2 === -1) {
      console.error('writed fail! anchor not find.');
      return;
    }
    const repCon1 = COMP_CONF_ANCHOR_1 + '\n' + CONFIG_1;
    const repCon2 = COMP_CONF_ANCHOR_2 + '\n' + CONFIG_2;
    fileContent = fileContent.replace(reg1, repCon1);
    fileContent = fileContent.replace(reg2, repCon2);
    fs.writeFile(COMP_CONF_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`added ${itemName} page\'s route config!`);
    })
  })
}

export function removeConfig(itemName: string) {
  if (!fs.existsSync(COMP_CONF_PATH)) {
    console.error('Route config file not find!');
    return;
  }

  fs.readFile(COMP_CONF_PATH, (err, data) => {
    let fileContent = data.toString();
    const pattern1 = `[ |\\t]*// '${itemName}' CONFIG 1 START[\\s\\S]*// '${itemName}' CONFIG 1 END[\\n]`;
    const pattern2 = `[ |\\t]*// '${itemName}' CONFIG 2 START[\\s\\S]*// '${itemName}' CONFIG 2 END[\\n]`;
    let reg1 = new RegExp(pattern1);
    let reg2 = new RegExp(pattern2);
    let start1= fileContent.search(reg1);
    let start2= fileContent.search(reg2);
    if (start1 === -1 && start2 === -1) {
      console.error('config not find!');
      return;
    }
    fileContent = fileContent.replace(reg1, '');
    fileContent = fileContent.replace(reg2, '');
    fs.writeFile(COMP_CONF_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`removed ${itemName} page\'s route config!`);
    })
  })
  
}