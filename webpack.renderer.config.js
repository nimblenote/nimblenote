module.exports = function (config) {
	config = enableCssModules(config);

	return enableJsxFileExtension(config);
};

function enableCssModules(config) {
	const styleRules = config.module.rules.filter(rule =>
		rule.test.toString().match(/css|less|s\(\[ac]\)ss/)
	);

	styleRules.forEach(rule => {
		const cssLoader = rule.use.find(use => use.loader === 'css-loader');
		cssLoader.options.modules = true;
	});

	return config;
}

function enableJsxFileExtension(config) {
	config.module.rules.push({
		test: /\.jsx?$/,
		loader: 'babel-loader',
		options: {
			presets: ['@babel/react']
		}
	});

	config.resolve = {
		extensions: ['.js', '.jsx']
	};

	return config;
}
