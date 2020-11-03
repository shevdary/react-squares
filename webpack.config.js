const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssPlugins = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                 loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'images',
                        name: '[name]:[sha1:hash:3].[ext]'
                    }
                }]
            },{
                test: /\.scss$/,
                use: [ miniCssPlugins.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            }

        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "Webpack Ahhgpp",
            template: "public/index.html"
        }),
        new miniCssPlugins(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        open:true,
        overlay: true
    }
};