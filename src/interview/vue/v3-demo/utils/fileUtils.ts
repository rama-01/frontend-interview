/**
 * 文件处理工具函数
 */

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

// 计算文件的唯一标识符
export const calculateFileIdentifier = (file: File): string => {
  // 使用文件名、大小和最后修改时间创建唯一标识
  const fileInfo = `${file.name}-${file.size}-${file.lastModified}`;
  return btoa(fileInfo);
};

// 获取文件扩展名
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

// 检查文件类型是否允许
export const isFileTypeAllowed = (filename: string, allowedTypes: string[]): boolean => {
  const ext = `.${getFileExtension(filename).toLowerCase()}`;
  return allowedTypes.includes(ext);
};

// 创建文件分片
export const createFileChunks = (file: File, chunkSize: number): Blob[] => {
  const chunks: Blob[] = [];
  let start = 0;
  
  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);
    start = end;
  }
  
  return chunks;
};

// 计算上传进度
export const calculateProgress = (loaded: number, total: number): number => {
  if (total === 0) return 0;
  return Math.floor((loaded / total) * 100);
};

// 生成随机ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};