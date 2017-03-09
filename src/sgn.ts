#!/usr/bin/env node
require('commander')
    .version('0.0.1')
    .usage('<command> [options]')
    .command('init', 'generate a new project from a template')
    .command('build', 'build module')
    .command('remove', 'remove module')
    .parse(process.argv);
