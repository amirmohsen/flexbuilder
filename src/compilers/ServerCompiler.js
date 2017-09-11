import webpack from 'webpack';
import webpackConfig from '../webpack/config';

export default class ServerCompiler {

	constructor(config) {
		this.config = config;
		this.webpackConfig = webpackConfig(this.config);
		this.compiler = webpack(this.webpackConfig);
		this.initialCompilationComplete = false;
	}

	build({restart}) {
		return new Promise(resolve => {
			if(this.config.dev) {
				this.compiler.watch({
					aggregateTimeout: 300,
					poll: true
				}, (...args) => this.onCompilationDone(...args, resolve, restart));
			}
			else {
				this.compiler.run((...args) => this.onCompilationDone(...args, resolve));
			}
		});
	}

	onCompilationDone(err, stats, resolve, restart = false) {
		if (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.error(err.details);
			}
			return;
		}

		console.log(stats.toString({
			chunks: false,  // Makes the build much quieter
			colors: true    // Shows colors in the console
		}));

		if(this.initialCompilationComplete) {
			if(restart) {
				restart();
			}
		}
		else {
			this.initialCompilationComplete = true;
			resolve();
		}
	}
}