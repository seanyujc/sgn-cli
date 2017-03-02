#!/usr/bin/env node
require('commander')
    .version('0.0.1')
    .usage('<command> [options]')
    .command('init', 'generate a new project from a template')
    .command('build', 'build module')
    .parse(process.argv);
//# sourceMappingURL=sgn.js.map