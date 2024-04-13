const path = require("path");
const commonConfig = require("./vite.config.js");
module.exports = {
  // other options...
  ...commonConfig,
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
};