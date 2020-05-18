const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

require('@babel/register')({
	// ava already handles transpilation of test files
	ignore: ['node_modules/*', '**/*.test.js', '**/*.test.jsx'],
	presets: ['@babel/preset-react']
});

// setup dummies for scss files that are loaded
require.extensions['.scss'] = () => {};
