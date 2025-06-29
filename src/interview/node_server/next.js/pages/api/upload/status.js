import fs from 'fs';
import path from 'path';

// 上传文件的临时存储目录
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

/**
 * 获取文件上传状态API
 * 用于检查已上传的分片，支持断点续传
 */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: '方法不允许' });
  }

  try {
    const { identifier } = req.query;

    if (!identifier) {
      return res.status(400).json({ success: false, message: '缺少文件标识符' });
    }

    // 检查临时目录是否存在
    const chunkDir = path.resolve(UPLOAD_DIR, identifier);
    
    // 如果目录不存在，表示还没有上传过分片
    if (!fs.existsSync(chunkDir)) {
      return res.status(200).json({ 
        success: true, 
        uploadedChunks: [],
        completed: false
      });
    }

    // 读取已上传的分片
    const uploadedChunks = fs.readdirSync(chunkDir)
      .filter(name => name.match(/^\d+$/))
      .map(name => parseInt(name));

    // 检查是否有合并后的文件
    const infoFile = path.resolve(chunkDir, 'info.json');
    let completed = false;
    let filename = '';
    let totalChunks = 0;

    if (fs.existsSync(infoFile)) {
      const info = JSON.parse(fs.readFileSync(infoFile, 'utf-8'));
      filename = info.filename;
      totalChunks = info.totalChunks;
      completed = info.completed || false;
    }

    return res.status(200).json({
      success: true,
      uploadedChunks,
      filename,
      totalChunks,
      completed
    });
  } catch (error) {
    console.error('获取上传状态出错:', error);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
}