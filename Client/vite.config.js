
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dns from 'dns'

// const commonConfig = {
//   // Cấu hình chung
//   plugins: [react()],
//   server: {
//     host: "localhost",
//   },
// };

// dns.setDefaultResultOrder('verbatim');

// export default defineConfig(commonConfig);

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
  define: {
    global:'window'
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: ['', '.js', '.jsx', '.tsx'] 
  },
};

dns.setDefaultResultOrder('verbatim');

export default defineConfig(commonConfig);