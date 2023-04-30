const path = require("path");

module.exports = {
  // other options...
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
};