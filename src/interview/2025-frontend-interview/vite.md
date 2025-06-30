#### 1. vite基础配置

1. 开发环境配置
   host, port, proxy, cors, warmup
2. 混淆器配置
   打包构建时移除console, debugger, 所有注释，作用是减少代码体积，增加逆向工程难度
3. 构建配置
   manualChunks: 手动控制依赖项的分块打包策略，实现更精细化的控制。例：

   ```js
   manualChunks: {
               vue: ["vue", "vue-router", "pinia"],
               element: ["element-plus", "@element-plus/icons-vue"],
               vxe: ["vxe-table"]
             }
   ```

* 优化首屏加载速度-拆分大体积依赖为独立文件，减少主包体积
* 利用浏览器缓存-不常更新的文件独立打包，利用浏览器缓存减少重复加载
* 按需加载能力-为动态导入提供支持

4. 插件配置
   css原子化，自动按需导入所需api， 自动按需导入所需组件，svgLoader(svg导入为vue组件)，svgComponent
