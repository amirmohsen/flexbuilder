import {resolve} from 'path';
import extend from 'extend';

const sharedOutput = {
	chunkFilename: '[name]-[chunkhash].js'
};

export default config => {
	const {
		root,
		dev,
		prod,
		library,
		client,
		server,
		devServerPort
	} = config;

	const output = extend(true, {}, sharedOutput);

	if(server) {
		output.filename = '[name].js';
		output.path = resolve(root, 'dist/server');
	}

	if(client) {
		if(library) {
			output.filename = '[name].js';
		}
		else {
			output.filename = '[name]-[hash].js';
		}

		output.path = resolve(root, 'dist/client');

		if(dev && !library) {
			output.publicPath = `http://localhost:${devServerPort}/`;
		}

		if(prod && !library) {
			output.publicPath = '/assets/';
		}
	}

	if(library) {
		output.library = library;
		output.libraryTarget = 'commonjs2';
	}

	return output;
}