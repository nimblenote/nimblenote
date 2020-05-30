module.exports = function (config) {
	return enableJsxFileExtension(config);
};

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
