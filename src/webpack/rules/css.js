import webpack from 'webpack';
import postcssImport from 'postcss-import';
import postcssNext from 'postcss-cssnext';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default config => {
	const {
		root,
		dev,
		prod,
		client,
		server
	} = config;

	let loaders = [];

	if(client) {
		if(dev) {
			loaders = [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						importLoaders: 1,
						localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [
							postcssImport({
								root,
								addDependencyTo: webpack
							}),
							postcssNext()
						]
					}
				}
			];
		}

		if(prod) {
			loaders = ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							modules: true,
							importLoaders: 1,
							localIdentName: '[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								postcssImport({
									root,
									addDependencyTo: webpack
								}),
								postcssNext()
							]
						}
					}
				]
			});
		}
	}

	if(server) {
		if(dev) {
			loaders = [
				{
					loader: 'css-loader/locals',
					options: {
						modules: true,
						localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [
							postcssImport({
								root,
								addDependencyTo: webpack
							}),
							postcssNext()
						]
					}
				}
			];
		}

		if(prod) {
			loaders = [
				{
					loader: 'css-loader/locals',
					options: {
						modules: true,
						localIdentName: '[hash:base64:5]'
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: () => [
							postcssImport({
								root,
								addDependencyTo: webpack
							}),
							postcssNext()
						]
					}
				}
			];
		}
	}

	return {
		test: /^((?!\.global).)*css$/,
		use: loaders
	};
}