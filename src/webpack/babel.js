import extend from 'extend';

const sharedConfig = {
	babelrc: false,
	presets: [],
	plugins: [
		'syntax-decorators',
		'syntax-async-functions',
		'transform-decorators-legacy',
		'transform-class-properties',
		'transform-object-rest-spread',
		'transform-async-to-generator'
	]
};

export default config => {
	let {
		dev,
		prod,
		client,
		server,
		alias
	} = config;

	let babelConfig = extend(true, {}, sharedConfig);

	if(server) {
		babelConfig.presets = [
			// [
			// 	'env',
			// 	{
			// 		targets: {
			// 			node: 6
			// 		},
			// 		modules: false,
			// 		useBuiltIns: true
			// 	}
			// ],
			[
				'latest-node6', {
					'object-rest': true,
					modules: false
				}
			],
			'react'
		];
	}

	 if(client) {
		babelConfig.presets = [
			[
				'env',
				{
					modules: false,
					useBuiltIns: true
				}
			],
			'react'
		];

		if(dev) {
			babelConfig.plugins.unshift('react-hot-loader/babel');
		}
	}

	if(prod) {
		babelConfig.presets.push('react-optimize');
	}

	if(server) {
		alias = alias.server;
	}
	else {
		alias = alias.client;
	}

	babelConfig.plugins.push(
		['module-resolver', {
			alias
		}]
	);

	return babelConfig;
}