#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import program = require('commander')

import * as commons from './lib/commons';
import * as pages from './lib/pages';
import * as components from './lib/components';
import * as services from './lib/services';

// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)

program
  .usage('[entry]')
  .option('-p,--page [page-name]', 'create page module')
  .option('-c,--comp [comp-name]', 'create component module')
  .option('-s,--service [service-name]', 'create service module')
  .option('-f,--fun [method-name]', "method name")
  .parse(process.argv);

// console.log(process.env.PWD);
console.log(__dirname);

// page module
if (typeof program.page === 'string') {
  console.log(`Creating ${program.page} module...`);
  pages.createFile(program.page)
  pages.writeConfig(program.page);
}
if (typeof program.comp === 'string') {
  console.log(`Creating ${program.comp} module...`);
  components.createFile(program.comp)
  components.writeConfig(program.comp);
}
if (typeof program.service === 'string' && typeof program.fun === 'undefined') {
  services.createFile(program.service)
  services.writeConfig(program.service)
}
if (typeof program.service === 'string' && typeof program.fun === 'string') {
  services.addFunction(program.service, program.fun)
}
