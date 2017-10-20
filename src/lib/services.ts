import fs = require('fs')
import path = require('path')

import * as commons from './commons';
import * as config from './config';

const SERVICE_INT_ANTHOR = '// XBP-NM-SI-NO-DELETE'
const SERVICE_FUN_ANTHOR = '// XBP-NM-SF-NO-DELETE'
const basePath = path.join(commons.currentPath(), 'src/app/core/services')
const _extname = '.service.ts'

export function createFile(serviceName: string) {
  const lfName = commons.lowerFirst(serviceName)
  const ufName = commons.upperFirst(serviceName)
  const SERVICE_FILE_TPL = `import ngb = require("ng-bases");

export interface I${ufName} {
    // XBP-NM-SI-NO-DELETE
}

export class ${ufName}Service implements I${ufName} {
    // XBP-NM-SF-NO-DELETE

    static $inject = ["$rootScope", "proxyHttp"];
    constructor(private $rootScope: ng.IRootScopeService, private proxyHttp: ngb.IProxyHttp) {
    }
}`



  commons.writeFile(basePath, lfName + _extname, SERVICE_FILE_TPL);
}

export function writeConfig(serviceName: string) {
  const lFName = commons.lowerFirst(serviceName);
  const uFName = commons.upperFirst(serviceName);
  const SERVICE_IMPORT_TPL = `import {${uFName}Service} from './services/${lFName}.service';`
  const SERVICE_CONFIG_TPL = `shared.service('${lFName}', ${uFName}Service);`

  fs.readFile(config.CORE_CONFIG_PATH, function (err, data) {
    if (err) {
      console.error(err);
      return
    }
    let fileContent = data.toString();
    let reg0 = new RegExp(config.CORE_IM_ATHOR);
    let reg1 = new RegExp(config.CORE_CONFIG_ATHOR);
    var start0 = fileContent.search(reg0)
    var start1 = fileContent.search(reg1)
    if (start0 === -1 || start1 === -1) {
      console.error('write service config fail! anchor not find.');
      return;
    }
    const repCon0 = config.CORE_IM_ATHOR + commons.endl() + SERVICE_IMPORT_TPL;
    const repCon1 = config.CORE_CONFIG_ATHOR + commons.endl() + SERVICE_CONFIG_TPL;
    fileContent = fileContent.replace(reg0, repCon0);
    fileContent = fileContent.replace(reg1, repCon1);
    fs.writeFile(config.CORE_CONFIG_PATH, fileContent, (err) => {
      if (err) throw err;
      console.log(`added ${serviceName} service config in the core file!`);
    })
  })
}

export function addFunction(serviceName: string, funName: string) {
  let filePath = path.join(basePath, serviceName + _extname)
  const SERVICE_INT_TPL = `    ${funName}(parameter: string):ng.IPromise<any>;`
  const SERVICE_FUN_TPL = `    ${funName}(parameter: string):ng.IPromise<any>{
        return this.proxyHttp.post('${funName}', {parameter});
    }`

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    let fileContent = data.toString();
    let reg0 = new RegExp(SERVICE_INT_ANTHOR);
    let reg1 = new RegExp(SERVICE_FUN_ANTHOR);
    var start0 = fileContent.search(reg0)
    var start1 = fileContent.search(reg1)
    if (start0 === -1 || start1 === -1) {
      console.error('write method in service is fail! anchor not find.');
      return;
    }
    const repCon0 = SERVICE_INT_ANTHOR + commons.endl() + SERVICE_INT_TPL;
    const repCon1 = SERVICE_FUN_ANTHOR + commons.endl() + SERVICE_FUN_TPL;
    fileContent = fileContent.replace(reg0, repCon0);
    fileContent = fileContent.replace(reg1, repCon1);
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      console.log(`added ${funName} method in the ${serviceName} service!`);
    })
  })
}

export function removeFile(serviceName: string) {

}