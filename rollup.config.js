var commonjs = require('rollup-plugin-commonjs')
var nodeResolve = require('rollup-plugin-node-resolve')
var replace = require('rollup-plugin-replace')
var babel = require('rollup-plugin-babel')
export default {
    entry: 'src/index.js',
    dest: 'index.js',
    format: 'umd',
    moduleName: 'jquery-gift-combo',
    external: [
        'jquery'
    ],
    globals: {
        jquery: '$'
    },
    plugins: [
        babel({presets: ['es2015-rollup']}),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
            extensions: [ '.js', '.json' ]
        }),
        commonjs({include: 'node_modules/**'}),
        replace({
            'process.env.NODE_ENV': "'production'"
        })
    ]
};
