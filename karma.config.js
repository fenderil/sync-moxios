const path = require('path')

const cwd = path.resolve(process.cwd())
const pkg = require(path.resolve(cwd, 'package.json'))

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        port: 9876,
        browserNoActivityTimeout: 60000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        autoWatchBatchDelay: 300,

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-jasmine-diff-reporter',
            'karma-junit-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],

        junitReporter: {
            suite: pkg.name,
            outputDir: path.resolve(cwd, `reports/tests/${pkg.name}`),
        },

        coverageReporter: {
            dir: path.resolve(cwd, 'reports/coverage'),
            subdir: '.',
            reporters: [
                {
                    type: 'html',
                    dir: 'reports/coverage/html'
                },
                {
                    type: 'lcov',
                    file: 'lcov.info'
                },
                {
                    type: 'cobertura',
                    file: 'cobertura.xml'
                }
            ]
        },

        reporters: ['progress', 'junit', 'jasmine-diff', 'coverage'],

        files: [
            path.join(__dirname, './tests/index.spec.js')
        ],
        exclude: [
        ],
        preprocessors: {
            'tests/index.spec.js': ['webpack', 'sourcemap']
        },
        concurrency: Infinity,
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }
    })
}
