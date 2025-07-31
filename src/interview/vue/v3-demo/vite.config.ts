// vite.config.ts 最终版
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Compress from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            resolvers: [ElementPlusResolver()],
            dts: 'src/types/auto/auto-imports.d.ts'
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: 'src/types/auto/components.d.ts'
        }),
        Compress({
            deleteOriginFile: true, // 删除源文件
            algorithm: 'gzip', // 使用gzip压缩
            ext: '.gz' // 生成的压缩包后缀
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            // 注意路径映射需与文件结构匹配
            '@': path.resolve(__dirname, 'src')
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
