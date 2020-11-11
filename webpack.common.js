const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin  = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new WorkboxPlugin.InjectManifest({
			swSrc: "./src/service-worker.js",
			swDest: "./src/service-worker.js"
		}),
		new CopyPlugin({
			patterns: [
				{ from: "src/view/pages", to: "src/view/pages" },
				{ from: "src/manifest.json", to: "src/manifest.json" },
				{ from: "src/icon", to: "src/icon" }
			],
		}),
	]
};
