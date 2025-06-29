// vite.config.ts 最终版
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue({})],
  resolve: {
    // 确保正确解析.vue扩展名
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      // 注意路径映射需与文件结构匹配
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './')
    }
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  base: './'
})
