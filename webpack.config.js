let fileName = require('./package').name

module.exports = {
    devtool: 'source-map',
    entry: './index.js',
    output: {
        filename: `dist/${fileName}.js`,
        library: 'moxios',
        libraryTarget: 'umd'
    },
    externals: {
        axios: 'axios'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            }
        ]
    }
}
