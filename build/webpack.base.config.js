const isProd = process.env.NODE_ENV === 'production'
const webpack = require('webpack')

const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [ new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }) ]

if(isProd) plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }))

if(isProd) plugins.push(new ExtractTextPlugin('css/style.[contenthash:8].css'))


module.exports = {
	output: {
		publicPath: '/assets/',
		path: path.resolve(__dirname, '../dist'),
		filename: isProd ? '[name].[chunkhash].js' : '[name].[hash].js',
		chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].[hash].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.jpe?g|png|svg|gif$/,
			exclude: /node_modules/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}]
		},{
			test: /\.css$/,
			exclude: /node_modules/,
			use:  isProd ? ExtractTextPlugin.extract({
				fallback: 'vue-style-loader',
				use: ['css-loader', 'postcss-loader']
			}) : ['vue-style-loader', 'css-loader', 'postcss-loader']
		},{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				extractCSS: isProd,
				preserveWhitespace: false
			}
		}]
	},
	resolve: {
		alias: {
			img: path.resolve('./src/img'),
			css: path.resolve('./src/css'),
			com: path.resolve('./src/com'),
			views: path.resolve('./src/views'),
			utils: path.resolve('./src/utils'),
			vue$: path.resolve('./lib/vue.runtime.esm.js')
		},
		extensions: ['.js', '.css', '.vue']
	},
	devtool: isProd ? false : '#cheap-module-source-map',
	plugins
}