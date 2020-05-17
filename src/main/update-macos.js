module.exports = logger => {
	require('update-electron-app')({
		logger: {
			log: (...args) => {
				logger.info(args.join(' '));
			}
		},
		repo: 'davidwinter/noted',
		updateInterval: '5 minutes'
	});
};
