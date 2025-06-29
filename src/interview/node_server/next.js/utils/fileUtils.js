import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * 文件处理工具函数
 */

// 计算文件的MD5哈希值
export const calculateFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('md5');
      const stream = fs.createReadStream(filePath);
      
      stream.on('data', (data) => {
        hash.update(data);
      });
      
      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// 确保目录存在，如果不存在则创建
export const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};

// 删除目录及其所有内容
export const removeDir = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
};

// 获取文件扩展名
export const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

// 生成安全的文件名
export const generateSafeFilename = (originalFilename) => {
  // 移除路径信息，只保留文件名
  const basename = path.basename(originalFilename);
  // 添加时间戳避免文件名冲突
  const timestamp = Date.now();
  // 生成随机字符串
  const randomString = crypto.randomBytes(8).toString('hex');
  // 获取文件扩展名
  const ext = getFileExtension(basename);
  // 组合新文件名
  return `${timestamp}-${randomString}${ext}`;
};

// 检查文件是否存在
export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

// 获取文件大小（字节）
export const getFileSize = (filePath) => {
  if (!fileExists(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.size;
};

// 格式化文件大小
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};