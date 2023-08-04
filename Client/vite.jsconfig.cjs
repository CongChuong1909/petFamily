// const path = require("path");
// const commonConfig = require("./vite.config.js");
// module.exports = {
//   // other options...
//   ...commonConfig,
//   resolve: {
//     alias: {
//       "~": path.resolve(__dirname, "src"),
//     },
//   },
// };


// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from 'dns';
import path from "path";

const commonConfig = {
  // Cấu hình chung
  plugins: [react()],
  server: {
    host: "localhost",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
};

dns.setDefaultResultOrder('verbatim');

export default defineConfig(commonConfig);
