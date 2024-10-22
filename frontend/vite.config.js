import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate chunk for third-party libraries
          }
        }
      }
    }
  }
});
