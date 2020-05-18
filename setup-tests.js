const {addHook} = require('pirates');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter: new Adapter()});

require('@babel/register')({
	// AVA already handles transpilation of test files
	ignore: ['node_modules/*', '**/*.test.js', '**/*.test.jsx'],
	presets: ['@babel/preset-react']
});

// Setup dummies for scss
addHook(() => '', {exts: ['.scss']});
