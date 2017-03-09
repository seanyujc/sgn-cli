#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import program = require('commander')

import * as commons from './lib/commons';
import * as pages from './lib/pages';

// const readdir = Promise.promisify(fs.readdir)
// const readFile = Promise.promisify(fs.readFile)

program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .option('--route-path [route-path]', "The path of config file")
    .parse(process.argv);

// console.log(process.env.PWD);

// page module
if (typeof program.page === 'string') {
    console.log(`Creating ${program.page} module...`);
    pages.createFile( program.page)
    pages.writeConfig(program.page);
}

