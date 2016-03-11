var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var SOURCE_DIR = path.resolve(__dirname, './source')
var DISTRIBUTIVE_DIR = path.resolve(__dirname, './distributive')

module.exports = {
	entry : path.resolve(SOURCE_DIR, "./app/main.jsx"),
	output : {
		filename : "./bundle.js",
		path : path.resolve(DISTRIBUTIVE_DIR)
	},
	module : {
		loaders : [
			{
				test : /\.jsx$/,
				loader : 'babel-loader',
                query : {
                    presets : ['es2015', 'react']
                },
                exclude : /node_modules/
			},
			{
				test : /\.css/,
				loader : 'style-loader!css-loader'
			}
		]
	},
	plugins : [
		new HTMLWebpackPlugin({
			title : "HJ Board",
			filename : 'index.html',
			template : './source/template.html',
			inject : false
		})
	]
}