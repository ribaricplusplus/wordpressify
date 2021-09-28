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
	// Init
	clearConsole();

	if (options.local) {
		installFromLocal();
	} else {
		installFromUpstream();
	}

	// Organise file structure
	const dotFiles = [
		'.babelrc',
		'.gitignore',
		'.stylelintrc',
		'.env.in',
		'.editorconfig',
	];
	const cssFiles = ['style.css', 'wordpressify.css'];
	const jsFiles = ['main.js'];
	const imgFiles = ['logo.svg'];
	const themeFiles = [
		'404.php',
		'archive.php',
		'comments.php',
		'content-none.php',
		'content-page.php',
		'content-single.php',
		'content.php',
		'footer.php',
		'functions.php',
		'header.php',
		'index.php',
		'page.php',
		'screenshot.png',
		'search.php',
		'searchform.php',
		'sidebar.php',
		'single.php',
	];
	const configFiles = ['php.ini.in'];
	const nginxFiles = [
		'welcome.html',
		'fastcgi.conf',
		'mime.types',
		'nginx.conf',
	];
	const sitesEnabledFiles = ['wordpress'];
	const snippetsFiles = ['fastcgi-php.conf'];

	// Start
	console.log('\n');
	console.log(
		'📦 ',
		chalk.black.bgYellow(
			` Downloading 🎈 WordPressify files in: → ${chalk.bgGreen(
				` ${theDir} `
			)}\n`
		),
		chalk.dim(`\n In the directory: ${theCWD}\n`),
		chalk.dim('This might take a couple of minutes.\n')
	);

	const spinner = ora({ text: '' });
	spinner.start(
		`1. Creating 🎈 WordPressify files inside → ${chalk.black.bgWhite(
			` ${theDir} `
		)}`
	);

	// Download
	Promise.all(filesToDownload.map((x) => download(x, `${theCWD}`))).then(
		moveFiles
	);
};

export { run };
