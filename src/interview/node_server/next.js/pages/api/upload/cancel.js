import fs from 'fs';
import path from 'path';

// 上传文件的临时存储目录
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

/**
 * 取消上传API
 * 删除已上传的分片和临时文件
 */
export default function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: '方法不允许' });
  }

  try {
    const { identifier } = req.query;

    if (!identifier) {
      return res.status(400).json({ success: false, message: '缺少文件标识符' });
    }

    // 检查临时目录是否存在
    const chunkDir = path.resolve(UPLOAD_DIR, identifier);
    
    // 如果目录存在，删除它及其所有内容
    if (fs.existsSync(chunkDir)) {
      // 递归删除目录
      fs.rmSync(chunkDir, { recursive: true, force: true });
    }

    return res.status(200).json({
      success: true,
      message: '上传已取消，临时文件已清理'
    });
  } catch (error) {
    console.error('取消上传出错:', error);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
}