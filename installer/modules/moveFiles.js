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

const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

export default async function moveFiles() {
	if (!fs.existsSync('src')) {
		await execa('mkdir', [
			'src',
			'src/theme',
			'src/plugins',
			'src/assets',
			'src/assets/css',
			'src/assets/js',
			'src/assets/img',
			'config',
			'config/nginx',
			'config/nginx/sites-enabled',
			'config/nginx/snippets',
		]);
	}

	dotFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, (err) =>
			handleError(err)
		)
	);
	cssFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/css/${x}`, (err) =>
			handleError(err)
		)
	);
	jsFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/js/${x}`, (err) =>
			handleError(err)
		)
	);
	imgFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/img/${x}`, (err) =>
			handleError(err)
		)
	);
	themeFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/src/theme/${x}`, (err) =>
			handleError(err)
		)
	);
	configFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/config/${x}`, (err) =>
			handleError(err)
		)
	);
	nginxFiles.forEach((x) =>
		fs.rename(`${theCWD}/${x}`, `${theCWD}/config/nginx/${x}`, (err) =>
			handleError(err)
		)
	);
	sitesEnabledFiles.forEach((x) =>
		fs.rename(
			`${theCWD}/${x}`,
			`${theCWD}/config/nginx/sites-enabled/${x}`,
			(err) => handleError(err)
		)
	);
	snippetsFiles.forEach((x) =>
		fs.rename(
			`${theCWD}/${x}`,
			`${theCWD}/config/nginx/snippets/${x}`,
			(err) => handleError(err)
		)
	);
	spinner.succeed();

	// The npm install
	spinner.start('2. Installing npm packages...');
	await execa('npm', ['install']);
	spinner.succeed();

	spinner.start('3. Installing WordPress and building Docker images...');
	await execa('npm', ['run', 'env:build']);
	spinner.succeed();

	// Done
	printNextSteps();
}
