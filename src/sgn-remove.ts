#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import program = require('commander')

import * as commons from './lib/commons';
import * as pages from './lib/pages';

program
    .usage('[entry]')
    .option('--page [page-name]', 'create page module')
    .option('--route-path [route-path]', "The path of config file")
    .parse(process.argv);

if (typeof program.page === 'string') {
    console.log(`Removing ${program.page} module...`);
    pages.removeFile(program.page)
    pages.removeConfig(program.page);
}