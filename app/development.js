import path from "path";

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "public/javascripts");

export default {
  mode: "development",
  entry: {
    form: src + "/form.js",
  },

  output: {
    path: dist,
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [],
};
