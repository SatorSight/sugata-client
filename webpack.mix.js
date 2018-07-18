let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


/*
 *  {
 test: /\.js?$/,
 loader: 'babel-loader?presets[]=react,presets[]=es2015',
 exclude: /node_modules/,
 query: {
 cacheDirectory: true,
 presets: ['react', 'es2015']
 }
 }





 {
 test: /\.js?$/,
 exclude: /node_modules/,
 loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
 },

 {
 test: /\.sass$/,
 use: ['sass-loader']
 },
 {
 test: /\.scss$/,
 use: ['scss-loader']
 }
 {
 test: /\.css$/,
 use: ['style-loader', 'css-loader']
 },

 * */

mix.react('resources/assets/js/app.js', 'public/js');
mix.sass('resources/assets/sass/app.scss', 'public/css');


// if (mix.inProduction()) {
    mix.version();
// }

// if (process.env.npm_lifecycle_event !== 'hot') {
//     mix.version();
// }

// const path = require('path');


mix.webpackConfig({
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'public'),
    // },
    module: {


        loaders: [{
            exclude: /node_modules/,
            test: /\.js[x]{0,1}$/,
            // loaders: ['react-hot-loader', 'babel-loader'],
            loaders: ['babel-loader'],
            query: {
                presets: ['env', 'es2015', 'stage-0', 'react'],
            }
        }],


        // rules: [
        //     {
        //         test: /\.jsx$/,
        //         loaders: ['babel-loader'],
        //         exclude: /node_modules/
        //     },
        //     {
        //         test: /\.js$/,
        //         loaders: ['babel-loader'],
        //         exclude: /node_modules/
        //     },
        // ]
    },
});


// mix.options({



    // uglify: {
    //     uglifyOptions: {
    //         output: {
    //             comments: function(node, comment){
    //                 return /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm.test(comment.value);
    //             },
    //             beautify: false
    //         },
    //     },
    // },

    // clearConsole: true
// });