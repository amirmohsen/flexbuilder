import Loader from './Loader';

export default async (config) => {
	let loader = new Loader(config);
	await loader.build();
	if(config.start) {
		loader.start();
	}
};