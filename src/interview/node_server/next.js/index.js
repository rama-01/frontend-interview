import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import config from './config';
import { startCleanupTask } from './utils/cleanupTask';
import fs from 'fs';
import path from 'path';

// 确保上传目录存在
const UPLOAD_DIR = path.resolve(process.cwd(), config.upload.tempDir);
const FILES_DIR = path.resolve(process.cwd(), config.upload.filesDir);

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

// 判断是否为开发环境
const dev = process.env.NODE_ENV !== 'production';

// 初始化Next.js应用
const app = next({ dev });
const handle = app.getRequestHandler();

// 启动应用
app.prepare().then(() => {
  // 创建HTTP服务器
  createServer((req, res) => {
    // 解析URL
    const parsedUrl = parse(req.url, true);
    
    // 处理请求
    handle(req, res, parsedUrl);
  }).listen(config.server.port, (err) => {
    if (err) throw err;
    
    console.log(`> 服务器已启动，监听端口: ${config.server.port}`);
    console.log(`> 环境: ${dev ? '开发' : '生产'}`);
    
    // 启动定时清理任务（每6小时执行一次）
    startCleanupTask(6 * 60 * 60 * 1000);
  });
});