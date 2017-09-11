import {resolve} from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import extend from 'extend';

export default config => {
	let {
		root,
		define = {},
		ssr,
		dev,
		prod,
		client,
		server
	} = config;

	define = extend(true, {server: {}, client: {}}, define);

	let plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(dev ? 'development' : 'production')
			},
			SSR_ENABLED: ssr,
			IS_DEVELOPMENT: dev,
			IS_PRODUCTION: prod,
			IS_CLIENT: client,
			IS_SERVER: server,
			...(server ? define.server : define.client)
		}),
		new webpack.ProvidePlugin({
			THREE: 'three'
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new ProgressBarPlugin()
	];

	if(dev) {
		plugins.push(new webpack.NamedModulesPlugin());
	}

	if(server) {
		if(dev) {
			plugins.push(new webpack.BannerPlugin({
				banner: 'require("source-map-support").install();',
				raw: true,
				entryOnly: false
			}));
		}

		plugins.unshift(new CleanPlugin(['dist/server'], {root}));
	}

	if(client) {
		plugins.push(new AssetsPlugin({
			path: resolve(root, 'dist'),
			prettyPrint: true
		}));

		if(dev) {
			plugins.push(new webpack.HotModuleReplacementPlugin());
		}

		if(prod) {
			plugins = [
				...plugins,
				new UglifyJSPlugin(),
				new ExtractTextPlugin('[name]-[id]-[contenthash].css')
			];
		}

		plugins.unshift(new CleanPlugin(['dist/client'], {root}));
	}

	return plugins;
}