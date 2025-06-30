// vite.config.ts 最终版
import {defineConfig} from 'vite'
import * as vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia']
        })
    ],
    resolve: {
        // 确保正确解析.vue扩展名
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            // 注意路径映射需与文件结构匹配
            '@': path.resolve(__dirname, './src')
            // '~': path.resolve(__dirname, './')
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
