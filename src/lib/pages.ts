import fs = require('fs')
import path = require('path')

import * as commons from './commons';
import * as config from './config';

const ROUTE_CONF_PATH = path.join(process.env.PWD, "src/app/index.routes.ts");
const ROUTE_PROVIDER_PATH = path.join(process.env.PWD, "src/app/core/providers/resolver.provider.ts");
const ROUTE_CONF_ANCHOR = "// XBP-NM-ROUTE-NO-DELETE";
const ROUTE_PROVIDER_0_ANCHOR = "// XBP-NM-PLI-NO-DELETE";
const ROUTE_PROVIDER_1_ANCHOR = "// XBP-NM-PLF-NO-DELETE";
const ROUTE_PROVIDER_2_ANCHOR = "// XBP-NM-PLL-NO-DELETE";
const MODULE_TPL_ROOT = path.join(config.TPL_ROOT, 'pages');

export function createFile(pageName: string) {
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
        let content = commons.replaceKeyword(data.toString('utf8'), pageName)
        let basePath = path.join(process.env.PWD, 'src/app/pages', pageName)
        commons.writeFile(basePath, pageName + _extname, content);
      })
    })
  })
}

export function removeFile(pageName: string) {
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
      let filePath = path.join(process.env.PWD, 'src/app/pages', pageName, pageName + _extname)
      fs.unlinkSync(filePath)
      console.log(`file "${filePath}" is removed`)
    })
    fs.rmdir(path.join(process.env.PWD, 'src/app/pages', pageName));
  })
}

export function writeConfig(pageName: string) {
  if (!fs.existsSync(ROUTE_CONF_PATH) || !fs.existsSync(ROUTE_PROVIDER_PATH)) {
    console.error('Route config file not find!');
    return;
  }

  const ROUTE_TPL = `    // '${pageName}' CONFIG START
    $stateProvider.state('${pageName}', {
        url: "/${pageName}",
        templateUrl: require('!!file-loader?name=templates/[name].[ext]!./pages/${pageName}/${pageName}.html'),
        controller: "${pageName}Controller",
        resolve: {
            ${pageName}Preloading: resolverProvider.${pageName}PagePreloading
        }
    });
    // '${pageName}' CONFIG END`

  const PROVIDER_0_TPL = `    // '${pageName}' CONFIG 0 START
    ${pageName}PagePreloading: Function,
    // '${pageName}' CONFIG 0 END`

  const PROVIDER_1_TPL = `        // '${pageName}' CONFIG 1 START
        const ${pageName}PagePreloading = function ($q: ng.IQService, $ocLazyLoad: ILazyLoad) {
            var deferred = $q.defer();
            require.ensure([], function (require) {
                var ${pageName}Module = require<{ default }>("../../pages/${pageName}/${pageName}.module").default;
                $ocLazyLoad.load({ name: ${pageName}Module.name })
                deferred.resolve(${pageName}Module.controller);
            })
            return deferred.promise;
        }
        ${pageName}PagePreloading.$inject = ['$q', '$ocLazyLoad']
        // '${pageName}' CONFIG 1 END`
  const PROVIDER_2_TPL = `            // '${pageName}' CONFIG 2 START
            ${pageName}PagePreloading,
            // '${pageName}' CONFIG 2 END`

  fs.readFile(ROUTE_CONF_PATH, (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    let fileContent = data.toString();
    let reg = new RegExp(ROUTE_CONF_ANCHOR);
    let start = fileContent.search(reg);
    if (start === -1) {
      console.error('writed fail! anchor not find.');
      return;
    }
    const repCon = ROUTE_CONF_ANCHOR + '\n' + ROUTE_TPL;
    fileContent = fileContent.replace(reg, repCon);
    fs.writeFile(ROUTE_CONF_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`added ${pageName} page\'s route config!`);
    })
  })
  fs.readFile(ROUTE_PROVIDER_PATH, (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    let fileContent = data.toString();
    let reg0 = new RegExp(ROUTE_PROVIDER_0_ANCHOR);
    let reg1 = new RegExp(ROUTE_PROVIDER_1_ANCHOR);
    let reg2 = new RegExp(ROUTE_PROVIDER_2_ANCHOR);
    let start0 = fileContent.search(reg0);
    let start1 = fileContent.search(reg1);
    let start2 = fileContent.search(reg2);
    if (start0 === -1 || start1 === -1 || start2 === -1) {
      console.error('write route provider fail! anchor not find.');
      return;
    }
    const repCon0 = ROUTE_PROVIDER_0_ANCHOR + '\n' + PROVIDER_0_TPL;
    const repCon1 = ROUTE_PROVIDER_1_ANCHOR + '\n' + PROVIDER_1_TPL;
    const repCon2 = ROUTE_PROVIDER_2_ANCHOR + '\n' + PROVIDER_2_TPL;

    fileContent = fileContent.replace(reg0, repCon0);
    fileContent = fileContent.replace(reg1, repCon1);
    fileContent = fileContent.replace(reg2, repCon2);

    fs.writeFile(ROUTE_PROVIDER_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`added ${pageName} page\'s route provider config!`);
    })
  })
}

export function removeConfig(pageName: string) {
  if (!fs.existsSync(ROUTE_CONF_PATH)) {
    console.error('Route config file not find!');
    return;
  }

  fs.readFile(ROUTE_CONF_PATH, (err, data) => {
    let fileContent = data.toString();
    const pattern = `[ |\\t]*// '${pageName}' CONFIG START[\\s\\S]*// '${pageName}' CONFIG END[\\n]`;
    let reg = new RegExp(pattern);
    let start = fileContent.search(reg);
    if (start === -1) {
      console.error('config not find!');
      return;
    }
    fileContent = fileContent.replace(reg, '');
    fs.writeFile(ROUTE_CONF_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`removed ${pageName} page\'s route config!`);
    })
  })
  fs.readFile(ROUTE_PROVIDER_PATH, (err, data) => {
    let fileContent = data.toString();
    const pattern0 = `[ |\\t]*// '${pageName}' CONFIG 0 START[\\s\\S]*// '${pageName}' CONFIG 0 END[\\n]`;
    const pattern1 = `[ |\\t]*// '${pageName}' CONFIG 1 START[\\s\\S]*// '${pageName}' CONFIG 1 END[\\n]`;
    const pattern2 = `[ |\\t]*// '${pageName}' CONFIG 2 START[\\s\\S]*// '${pageName}' CONFIG 2 END[\\n]`;
    let reg0 = new RegExp(pattern0);
    let reg1 = new RegExp(pattern1);
    let reg2 = new RegExp(pattern2);
    let start0 = fileContent.search(reg0);
    let start1 = fileContent.search(reg1);
    let start2 = fileContent.search(reg2);
    if (start0 === -1 || start1 === -1 || start2 === -1) {
      console.error('config not find!');
      return;
    }
    fileContent = fileContent.replace(reg0, '');
    fileContent = fileContent.replace(reg1, '');
    fileContent = fileContent.replace(reg2, '');
    fs.writeFile(ROUTE_PROVIDER_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`removed ${pageName} page\'s route provider config!`);
    })
  })
}