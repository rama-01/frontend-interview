// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-react', // 支持 JSX
    ],
    plugins: [
        [
            'components',
            {
                // 显式指定插件入口
                libraryName: 'antd',
                esModule: true,
            },
        ],
    ],
}
