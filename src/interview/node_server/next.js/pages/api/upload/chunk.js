import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

// 禁用Next.js的默认body解析，因为我们使用formidable处理文件上传
export const config = {
  api: {
    bodyParser: false,
  },
};

// 上传文件的临时存储目录
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

/**
 * 分片上传处理API
 * 接收文件分片并保存到临时目录
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '方法不允许' });
  }

  // 确保上传目录存在
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  try {
    // 使用formidable解析表单数据
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 限制每个分片最大10MB
    });

    // 解析表单数据
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // 获取必要的参数
    const { identifier, chunkIndex, totalChunks, filename } = fields;
    const chunkFile = files.chunk;

    if (!identifier || !chunkIndex || !totalChunks || !filename || !chunkFile) {
      return res.status(400).json({ success: false, message: '参数不完整' });
    }

    // 创建该文件的临时目录
    const chunkDir = path.resolve(UPLOAD_DIR, identifier[0]);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }

    // 保存分片信息
    const infoFile = path.resolve(chunkDir, 'info.json');
    const fileInfo = {
      filename: filename[0],
      identifier: identifier[0],
      totalChunks: parseInt(totalChunks[0]),
      completed: false,
    };
    fs.writeFileSync(infoFile, JSON.stringify(fileInfo));

    // 将分片移动到对应目录
    const chunkFilePath = path.resolve(chunkDir, chunkIndex[0]);
    fs.renameSync(chunkFile[0].filepath, chunkFilePath);

    return res.status(200).json({
      success: true,
      message: '分片上传成功',
      chunkIndex: parseInt(chunkIndex[0]),
    });
  } catch (error) {
    console.error('上传分片出错:', error);
    return res.status(500).json({ success: false, message: '服务器内部错误' });
  }
}