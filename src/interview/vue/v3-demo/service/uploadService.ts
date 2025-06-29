/**
 * 文件上传API服务
 */

import { UploadStatus, ChunkUploadResponse, MergeChunksResponse } from '../types';
import apiClient from './axiosConfig';

// 获取上传状态
export const getUploadStatus = async (identifier: string): Promise<UploadStatus> => {
  try {
    const response = await apiClient.get(`/upload/status`, {
      params: { identifier }
    });
    return response.data;
  } catch (error) {
    console.error('获取上传状态出错:', error);
    throw error;
  }
};

// 上传文件分片
export const uploadChunk = async (
  chunk: Blob,
  identifier: string,
  chunkIndex: number,
  totalChunks: number,
  filename: string
): Promise<ChunkUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('chunk', chunk, `${identifier}-${chunkIndex}`);
    formData.append('identifier', identifier);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('filename', filename);

    const response = await apiClient.post('/upload/chunk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('上传分片出错:', error);
    throw error;
  }
};

// 合并文件分片
export const mergeChunks = async (
  identifier: string,
  filename: string,
  totalChunks: number
): Promise<MergeChunksResponse> => {
  try {
    const response = await apiClient.post('/upload/merge', {
      identifier,
      filename,
      totalChunks
    });

    return response.data;
  } catch (error) {
    console.error('合并分片出错:', error);
    throw error;
  }
};

// 取消上传
export const cancelUpload = async (identifier: string): Promise<void> => {
  try {
    await apiClient.delete(`/upload/cancel`, {
      params: { identifier }
    });
  } catch (error) {
    console.error('取消上传出错:', error);
    throw error;
  }
};