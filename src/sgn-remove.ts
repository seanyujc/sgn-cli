#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import program = require('commander')
import readline = require('readline');

import * as commons from './lib/commons';
import * as pages from './lib/pages';
import * as components from './lib/components';

program
  .usage('[entry]')
  .option('-p,--page [page-name]', 'create page module')
  .option('-c,--comp [comp-name]', 'create component module')
  .parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (typeof program.page === 'string') {
  rl.question(`Are you sure to remove ${program.page} module?(y or N):`, (answer) => {
    if (answer.toLocaleLowerCase() === 'y') {
      console.log(`Removing ${program.page} module...`);
      pages.removeFile(program.page)
      pages.removeConfig(program.page);
    }
    rl.close();
  });
}

if (typeof program.comp === 'string') {
  rl.question(`Are you sure to remove ${program.comp} module?(y or N):`, (answer) => {
    if (answer.toLocaleLowerCase() === 'y') {
      console.log(`Removing ${program.comp} module...`);
      components.removeFile(program.comp)
      components.removeConfig(program.comp);
    }
    rl.close();
  });
}