const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./client/index.js'],
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							{
								plugins: [
									'@babel/plugin-proposal-class-properties',
									'@babel/plugin-transform-runtime',
								],
							},
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWepackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		publicPath: '/',
		port: 8080,
		proxy: {
			'/': {
				target: 'http://localhost:3000/',
			},
		},
		hot: true,
		inline: true,
		open: true,
		historyApiFallback: true,
	},
};
