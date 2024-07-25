const { defineConfig } = require("@vue/cli-service");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Vue Todo App", // Set the title here
        template: "public/index.html", // Path to the template file
        filename: "index.html",
        inject: true,
      }),
    ],
  },
});
