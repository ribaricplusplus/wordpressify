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
	]

const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

export function installFromLocal() {

}

export function installFromUpstream() {
	let upstreamUrl = '';
	if (process.env.WPFY_GH_REPO) {
		// When running GitHub actions, make sure the files from current repo are downloaded
		let refname = process.env.WPFY_GH_REF.split('/');
		refname = refname[refname.length - 1];
		upstreamUrl = `https://raw.githubusercontent.com/${process.env.WPFY_GH_REPO}/${refname}`;
	} else {
		upstreamUrl = `https://raw.githubusercontent.com/luangjokaj/wordpressify/v${version}`;
	}

	const filesToDownload = files.map( ( file ) => `${upstreamUrl}/${file}`)

	await Promise.all(filesToDownload.map((x) => download(x, `${theCWD}`)));

	moveFiles();
}
