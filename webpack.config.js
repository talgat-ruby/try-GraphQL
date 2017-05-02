var path = require('path');

module.exports = {
	entry: './server/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
		        },
			}
		]
	},
	resolve: {
		modules: ['node_modules']
	},
	target: 'node'
};
