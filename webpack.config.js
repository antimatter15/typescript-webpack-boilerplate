const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const history = require('connect-history-api-fallback')
const connect = require('koa-connect')

module.exports = {
    mode: 'development',

    entry: {
        main: [path.join(__dirname, '/src/index.tsx')],
    },
    output: {
        filename: 'app.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            chunks: ['main'],
        }),
    ],

    serve: {
        content: [__dirname],
        add: (app, middleware, options) => {
            app.use(connect(history({})))
        },
    },
}
