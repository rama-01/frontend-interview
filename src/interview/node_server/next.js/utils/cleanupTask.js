import fs from 'fs';
import path from 'path';
import config from '../config';

/**
 * 临时文件清理任务
 * 定期清理过期的临时上传文件
 */

const UPLOAD_DIR = path.resolve(process.cwd(), config.upload.tempDir);

/**
 * 清理过期的临时文件
 */
export const cleanupExpiredFiles = () => {
  try {
    // 确保上传目录存在
    if (!fs.existsSync(UPLOAD_DIR)) {
      return;
    }

    console.log('[Cleanup] 开始清理过期的临时文件...');
    const now = Date.now();
    const expiration = config.upload.tempFileExpiration;

    // 读取上传目录中的所有文件夹（每个文件夹对应一个上传任务）
    const directories = fs.readdirSync(UPLOAD_DIR);

    for (const dir of directories) {
      const dirPath = path.resolve(UPLOAD_DIR, dir);
      const stats = fs.statSync(dirPath);

      // 如果是目录且已过期
      if (stats.isDirectory() && now - stats.mtimeMs > expiration) {
        // 检查是否有info.json文件
        const infoFile = path.resolve(dirPath, 'info.json');
        
        // 如果存在info.json，检查上传是否已完成
        if (fs.existsSync(infoFile)) {
          try {
            const info = JSON.parse(fs.readFileSync(infoFile, 'utf-8'));
            
            // 如果上传已完成，可以安全删除临时文件
            if (info.completed) {
              console.log(`[Cleanup] 删除已完成的上传任务: ${dir}`);
              fs.rmSync(dirPath, { recursive: true, force: true });
            }
            // 如果上传未完成但已过期
            else if (now - stats.mtimeMs > expiration) {
              console.log(`[Cleanup] 删除过期的上传任务: ${dir}`);
              fs.rmSync(dirPath, { recursive: true, force: true });
            }
          } catch (error) {
            console.error(`[Cleanup] 解析info.json出错: ${error.message}`);
          }
        }
        // 没有info.json文件，直接删除
        else {
          console.log(`[Cleanup] 删除过期的临时目录: ${dir}`);
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      }
    }

    console.log('[Cleanup] 临时文件清理完成');
  } catch (error) {
    console.error('[Cleanup] 清理临时文件出错:', error);
  }
};

/**
 * 启动定时清理任务
 * @param {number} interval - 清理间隔（毫秒）
 */
export const startCleanupTask = (interval = 3600000) => { // 默认每小时清理一次
  console.log(`[Cleanup] 启动定时清理任务，间隔: ${interval}ms`);
  
  // 立即执行一次清理
  cleanupExpiredFiles();
  
  // 设置定时任务
  return setInterval(cleanupExpiredFiles, interval);
};

// 如果直接运行此文件，执行一次清理
if (require.main === module) {
  cleanupExpiredFiles();
}