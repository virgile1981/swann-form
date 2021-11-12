const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    entry: './src/server.ts',
    resolve: {
        extensions: ['.ts', '.js','.mustache'],
        alias: {},
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/,
                exclude: /node_module/,
            },
            {
                use: 'mustache-loader',
                test: /\.mustache$/
            }
        ],
    },

};
