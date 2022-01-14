const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    plugins: [new CompressionPlugin()],
    optimization: {
        splitChunks: {
            name: false,
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
}

