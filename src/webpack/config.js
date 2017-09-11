import entry from './entry';
import output from './output';
import rules from './rules/rules';
import resolveLoader from './resolveLoader';
import plugins from './plugins';
import devtool from './devtool';
import target from './target';
import externals from './externals';
import node from './node';

export default config => {
	let {
		root,
		alias = {}
	} = config;

	alias = {
		...{
			client: {},
			server: {}
		},
		...alias
	};

	config.alias = alias;

	return {
		context: root,
		entry: entry(config),
		output: output(config),
		module: {
			rules: rules(config)
		},
		resolve: {
			modules: [
				root,
				'node_modules'
			]
		},
		resolveLoader: resolveLoader(config),
		plugins: plugins(config),
		devtool: devtool(config),
		target: target(config),
		externals: externals(config),
		node: node(config)
	};
}