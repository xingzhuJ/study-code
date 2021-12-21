import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
const path = '/Users/shuiyu/project/maiui/node_modules';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: /^~antd/,
        replacement: `${path}/antd`,
      },
      {
        find: /^react/,
        replacement: `${path}/react`,
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
