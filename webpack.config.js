const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    entry: './src/app/index.js',
    output:{
        path: __dirname + '/src/public/js',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}

/**
 * El bundle.js contendrá toda la logica y lo que hace vue pero en js,
 * de modo que pueda ser entendible por el navegador.
 */