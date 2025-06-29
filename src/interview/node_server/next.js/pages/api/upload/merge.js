import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

// 上传文件的临时存储目录
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');
// 合并后的文件存储目录
const FILES_DIR = path.resolve(process.cwd(), 'public/files');

/**
 * 合并分片API
 * 将上传的分片合并成完整文件
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '方法不允许' });
  }

  try {
    const { identifier, filename, totalChunks } = req.body;

    if (!identifier || !filename || !totalChunks) {
      return res.status(400).json({ success: false, message: '参数不完整' });
    }

    // 检查分片目录是否存在
    const chunkDir = path.resolve(UPLOAD_DIR, identifier);
    if (!fs.existsSync(chunkDir)) {
      return res.status(404).json({ success: false, message: '找不到上传的分片' });
    }

    // 确保目标目录存在
    if (!fs.existsSync(FILES_DIR)) {
      fs.mkdirSync(FILES_DIR, { recursive: true });
    }

    // 读取已上传的分片
    const chunks = fs.readdirSync(chunkDir)
      .filter(name => name.match(/^\d+$/))
      .sort((a, b) => parseInt(a) - parseInt(b));

    // 检查是否所有分片都已上传
    if (chunks.length !== totalChunks) {
      return res.status(400).json({
        success: false,
        message: `分片不完整，已上传 ${chunks.length}/${totalChunks}`,
      });
    }

    // 生成安全的文件名（避免路径遍历攻击）
    const safeFilename = path.basename(filename);
    // 添加时间戳避免文件名冲突
    const timestamp = Date.now();
    const destFilename = `${timestamp}-${safeFilename}`;
    const destFilePath = path.resolve(FILES_DIR, destFilename);

    // 创建写入流
    const writeStream = fs.createWriteStream(destFilePath);

    // 按顺序合并所有分片
    for (const chunk of chunks) {
      const chunkPath = path.resolve(chunkDir, chunk);
      const chunkStream = fs.createReadStream(chunkPath);
      await pipeline(chunkStream, writeStream, { end: false });
    }

    // 关闭写入流
    writeStream.end();

    // 更新文件信息
    const infoFile = path.resolve(chunkDir, 'info.json');
    if (fs.existsSync(infoFile)) {
      const fileInfo = JSON.parse(fs.readFileSync(infoFile, 'utf-8'));
      fileInfo.completed = true;
      fileInfo.destPath = destFilePath;
      fs.writeFileSync(infoFile, JSON.stringify(fileInfo));
    }

    // 生成文件访问URL
    const fileUrl = `/files/${destFilename}`;

    return res.status(200).json({
      success: true,
      message: '文件合并成功',
      url: fileUrl,
    });
  } catch (error) {
    console.error('合并分片出错:', error);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
}