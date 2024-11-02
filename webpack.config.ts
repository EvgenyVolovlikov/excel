import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const port = 3000;

const modes = {
	dev: 'development',
	prod: 'production',
};

const filename = (ext: string) =>
	isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	];

	return loaders;
};

export default () => {
	return {
		context: path.resolve(__dirname, 'src'),
		mode: modes.dev,
		entry: ['@babel/polyfill', './index.ts'],
		output: {
			filename: filename('js'),
			path: path.resolve(__dirname, 'dist'),
		},
		resolve: {
			extensions: ['.js', '.ts'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@core': path.resolve(__dirname, 'src/core'),
			},
		},
		devtool: isDev ? 'source-map' : false,
		devServer: {
			port: port,
			hot: isDev,
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HTMLWebpackPlugin({
				template: 'index.html',
				minify: {
					removeComments: isProd,
					collapseWhitespace: isProd,
				},
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'src/favicon.ico'),
						to: path.resolve(__dirname, 'dist'),
					},
				],
			}),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			}),
		],
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: jsLoaders(),
				},
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
	};
};
