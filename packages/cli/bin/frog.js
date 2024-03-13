#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
const { sync } = require('../src/commands/sync');
const { build } = require('../src/commands/build');
const { release } = require('../src/commands/release');

program
    .command('sync')
    .description('sync your project config')
    .action(sync);
program
    .command('build')
    .description('build your project')
    .action(build);
program
    .command('release')
    .description('publish repository')
    .action(release);
program.parse(process.argv);
