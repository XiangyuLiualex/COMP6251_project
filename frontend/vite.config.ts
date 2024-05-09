import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     port: 3000,
//   },
//   plugins: [react()]
// });
export default defineConfig(({ mode }) => {
  const { GOOGLE_MAPS_API_KEY = '' } = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      https: true
    },
    plugins: [react(), mkcert()],
    define: {
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY)
    },
    resolve: {
      alias: {
        '@vis.gl/react-google-maps/examples.js':
          'https://visgl.github.io/react-google-maps/scripts/examples.js'
      }
    }
  };
});

