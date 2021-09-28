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
import moveFiles from './moveFiles';

const require = createRequire(import.meta.url);
const packageData = require('../package.json');

const version = packageData.version;

const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

const run = (options) => {
	// Init
	clearConsole();

	const files = [
		`.babelrc`,
		`.gitignore`,
		`.stylelintrc`,
		`.env.in`,
		`.editorconfig`,
		`LICENSE`,
		`README.md`,
		`gulpfile.js`,
		`docker-compose.yml`,
		`Dockerfile.in`,
		`installer/package.json`,

		`config/php.ini.in`,
		`config/nginx/welcome.html`,
		`config/nginx/fastcgi.conf`,
		`config/nginx/mime.types`,
		`config/nginx/nginx.conf`,
		`config/nginx/sites-enabled/wordpress`,
		`config/nginx/snippets/fastcgi-php.conf`,

		`src/assets/css/style.css`,
		`src/assets/css/wordpressify.css`,

		`src/assets/js/main.js`,

		`src/assets/img/logo.svg`,

		`src/theme/404.php`,
		`src/theme/archive.php`,
		`src/theme/comments.php`,
		`src/theme/content-none.php`,
		`src/theme/content-page.php`,
		`src/theme/content-single.php`,
		`src/theme/content.php`,
		`src/theme/footer.php`,
		`src/theme/functions.php`,
		`src/theme/header.php`,
		`src/theme/index.php`,
		`src/theme/page.php`,
		`src/theme/screenshot.png`,
		`src/theme/search.php`,
		`src/theme/searchform.php`,
		`src/theme/sidebar.php`,
		`src/theme/single.php`,
	];

	let upstreamUrl = '';
	if (process.env.WPFY_GH_REPO) {
		// When running GitHub actions, make sure the files from current repo are downloaded
		let refname = process.env.WPFY_GH_REF.split('/');
		refname = refname[refname.length - 1];
		upstreamUrl = `https://raw.githubusercontent.com/${process.env.WPFY_GH_REPO}/${refname}`;
	} else {
		upstreamUrl = `https://raw.githubusercontent.com/luangjokaj/wordpressify/v${version}`;
	}

	const filesToDownload = [
		`${upstreamUrl}/.babelrc`,
		`${upstreamUrl}/.gitignore`,
		`${upstreamUrl}/.stylelintrc`,
		`${upstreamUrl}/.env.in`,
		`${upstreamUrl}/.editorconfig`,
		`${upstreamUrl}/LICENSE`,
		`${upstreamUrl}/README.md`,
		`${upstreamUrl}/gulpfile.js`,
		`${upstreamUrl}/docker-compose.yml`,
		`${upstreamUrl}/Dockerfile.in`,
		`${upstreamUrl}/installer/package.json`,

		`${upstreamUrl}/config/php.ini.in`,
		`${upstreamUrl}/config/nginx/welcome.html`,
		`${upstreamUrl}/config/nginx/fastcgi.conf`,
		`${upstreamUrl}/config/nginx/mime.types`,
		`${upstreamUrl}/config/nginx/nginx.conf`,
		`${upstreamUrl}/config/nginx/sites-enabled/wordpress`,
		`${upstreamUrl}/config/nginx/snippets/fastcgi-php.conf`,

		`${upstreamUrl}/src/assets/css/style.css`,
		`${upstreamUrl}/src/assets/css/wordpressify.css`,

		`${upstreamUrl}/src/assets/js/main.js`,

		`${upstreamUrl}/src/assets/img/logo.svg`,

		`${upstreamUrl}/src/theme/404.php`,
		`${upstreamUrl}/src/theme/archive.php`,
		`${upstreamUrl}/src/theme/comments.php`,
		`${upstreamUrl}/src/theme/content-none.php`,
		`${upstreamUrl}/src/theme/content-page.php`,
		`${upstreamUrl}/src/theme/content-single.php`,
		`${upstreamUrl}/src/theme/content.php`,
		`${upstreamUrl}/src/theme/footer.php`,
		`${upstreamUrl}/src/theme/functions.php`,
		`${upstreamUrl}/src/theme/header.php`,
		`${upstreamUrl}/src/theme/index.php`,
		`${upstreamUrl}/src/theme/page.php`,
		`${upstreamUrl}/src/theme/screenshot.png`,
		`${upstreamUrl}/src/theme/search.php`,
		`${upstreamUrl}/src/theme/searchform.php`,
		`${upstreamUrl}/src/theme/sidebar.php`,
		`${upstreamUrl}/src/theme/single.php`,
	];

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
