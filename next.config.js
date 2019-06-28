// next.config.js
const path = require("path");
const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript({
  webpack(config, options) {
    // config.module.rules.push({
    // test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    // use: {
    //     loader: 'url-loader',
    //     options: {
    //         limit: 100000
    //     }
    // }
    // })

    // Here is the magic
    // We push our config into the resolve.modules array
    config.resolve.modules.push(path.resolve("./renderer"));

    return config;
  }
  /* config options here */
});
