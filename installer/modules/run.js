/**
 * Installation
 */

import fs from 'fs';
import { copyFile } from 'fs/promises';
import ora from 'ora';
import execa from 'execa';
import chalk from 'chalk';
import download from 'download';
import { createRequire } from 'module';
import { handleError } from './handleError.js';
import { clearConsole } from './clearConsole.js';
import { printNextSteps } from './printNextSteps.js';
import { installFromLocal, installFromUpstream } from './install.js'

const require = createRequire(import.meta.url);
const packageData = require('../package.json');

const version = packageData.version;

const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

const run = (options) => {
	clearConsole();

	if (options.local) {
		installFromLocal();
	} else {
		installFromUpstream();
	}

	await execa('npm', ['install']);

	await execa('npm', ['run', 'env:build']);

	printNextSteps();
};

export { run };
