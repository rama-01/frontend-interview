// 上传文件的状态信息
export interface UploadStatus {
  identifier: string;  // 文件唯一标识
  filename: string;    // 文件名
  totalChunks: number; // 总分片数
  uploadedChunks: number[]; // 已上传的分片索引
  completed: boolean;  // 是否已完成上传
}

// 分片上传响应
export interface ChunkUploadResponse {
  success: boolean;
  message: string;
  chunkIndex?: number;
}

// 合并分片请求参数
export interface MergeChunksRequest {
  identifier: string;
  filename: string;
  totalChunks: number;
}

// 合并分片响应
export interface MergeChunksResponse {
  success: boolean;
  message: string;
  url?: string; // 合并后的文件URL
}