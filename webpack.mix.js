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

mix.react('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');

if (process.env.npm_lifecycle_event !== 'hot') {
    mix.version();
}

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
            },




        ]
    },
});
