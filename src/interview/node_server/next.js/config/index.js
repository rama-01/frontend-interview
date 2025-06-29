/**
 * 应用配置文件
 */

const config = {
  // 上传配置
  upload: {
    // 临时文件存储目录
    tempDir: 'uploads',
    // 永久文件存储目录
    filesDir: 'public/files',
    // 最大文件大小 (1GB)
    maxFileSize: 1024 * 1024 * 1024,
    // 分片大小 (2MB)
    chunkSize: 2 * 1024 * 1024,
    // 允许的文件类型
    allowedTypes: [
      // 图片
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
      // 文档
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt',
      // 压缩文件
      '.zip', '.rar', '.7z', '.tar', '.gz',
      // 音视频
      '.mp3', '.mp4', '.avi', '.mov', '.wmv', '.flv',
      // 其他
      '.json', '.xml', '.csv'
    ],
    // 临时文件过期时间（24小时，单位：毫秒）
    tempFileExpiration: 24 * 60 * 60 * 1000,
  },
  
  // 服务器配置
  server: {
    // 端口
    port: process.env.PORT || 3000,
    // 主机
    host: process.env.HOST || 'localhost',
    // API前缀
    apiPrefix: '/api',
  },
  
  // 安全配置
  security: {
    // CORS配置
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000', 'http://localhost:8080'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
};

export default config;