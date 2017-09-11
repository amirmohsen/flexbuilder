import babel from '../babel';

export default config => {
	let {
		server,
		alias
	} = config;

	if(server) {
		alias = alias.server;
	}
	else {
		alias = alias.client;
	}

	return [
		{
			test: /\.jsx?$/,
			include: /@flexverse/,
			enforce: 'pre',
			loader: {
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [],
					plugins: [
						['module-resolver', {
							alias
						}]
					]
				}
			}
		},
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: {
				loader: 'babel-loader',
				options: babel(config)
			}
		}
	];
}