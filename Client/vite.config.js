
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from 'dns'

const commonConfig = {
  // Cấu hình chung
  plugins: [react()],
  server: {
    host: "localhost",
  },
};

dns.setDefaultResultOrder('verbatim');

export default defineConfig(commonConfig);