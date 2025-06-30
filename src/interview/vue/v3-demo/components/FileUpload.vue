<template>
  <div class="upload-container">
    <el-card class="upload-card">
      <template #header>
        <div class="card-header">
          <span>文件上传</span>
          <el-button type="primary" @click="handleSelectFile">选择文件</el-button>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileChange"
          />
        </div>
      </template>
      
      <div v-if="currentFile" class="file-info">
        <p><strong>文件名:</strong> {{ currentFile.name }}</p>
        <p><strong>文件大小:</strong> {{ formatFileSize(currentFile.size) }}</p>
        <p><strong>上传进度:</strong> {{ uploadProgress }}%</p>
        
        <el-progress :percentage="uploadProgress" :status="uploadStatus"></el-progress>
        
        <div class="upload-actions">
          <el-button type="success" @click="startUpload" :disabled="isUploading">开始上传</el-button>
          <el-button type="warning" @click="pauseUpload" :disabled="!isUploading">暂停上传</el-button>
          <el-button type="danger" @click="cancelUpload" :disabled="!currentFile">取消上传</el-button>
        </div>
      </div>
      
      <div v-else class="empty-tip">
        <el-empty description="请选择要上传的文件"></el-empty>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUploadStatus, uploadChunk, mergeChunks, cancelUpload } from '../service/uploadService'
import {unicodeToBase64} from '../utils/fileUtils'

// 分片大小：2MB
const CHUNK_SIZE = 2 * 1024 * 1024

export default defineComponent({
  name: 'FileUpload',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const currentFile = ref<File | null>(null)
    const uploadProgress = ref(0)
    const isUploading = ref(false)
    const isPaused = ref(false)
    const uploadStatus = ref('normal')
    
    // 上传状态信息
    const uploadInfo = reactive({
      identifier: '',  // 文件唯一标识
      chunkSize: CHUNK_SIZE,
      totalChunks: 0,
      uploadedChunks: new Set<number>(),
      currentChunkIndex: 0
    })
    
    // 选择文件按钮点击事件
    const handleSelectFile = () => {
      fileInput.value?.click()
    }
    
    // 文件选择变更事件
    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.files && input.files.length > 0) {
        currentFile.value = input.files[0]
        resetUploadState()
      }
    }
    
    // 重置上传状态
    const resetUploadState = () => {
      if (!currentFile.value) return
      
      uploadProgress.value = 0
      isUploading.value = false
      isPaused.value = false
      uploadStatus.value = 'normal'
      
      // 计算文件唯一标识（文件名+大小+最后修改时间）
      debugger
      const fileInfo = `${currentFile.value.name}-${currentFile.value.size}-${currentFile.value.lastModified}`
      uploadInfo.identifier = unicodeToBase64(fileInfo)
      uploadInfo.totalChunks = Math.ceil(currentFile.value.size / CHUNK_SIZE)
      uploadInfo.uploadedChunks.clear()
      uploadInfo.currentChunkIndex = 0
      
      // 检查已上传的分片
      checkUploadedChunks()
    }
    
    // 检查已上传的分片
    const checkUploadedChunks = async () => {
      try {
        const data = await getUploadStatus(uploadInfo.identifier)
        if (data.uploadedChunks && Array.isArray(data.uploadedChunks)) {
          uploadInfo.uploadedChunks = new Set(data.uploadedChunks)
          
          // 更新上传进度
          if (uploadInfo.totalChunks > 0) {
            uploadProgress.value = Math.floor(
              (uploadInfo.uploadedChunks.size / uploadInfo.totalChunks) * 100
            )
            
            // 如果已全部上传完成
            if (uploadInfo.uploadedChunks.size === uploadInfo.totalChunks) {
              uploadStatus.value = 'success'
              ElMessage.success('文件已上传完成')
            }
          }
        }
      } catch (error) {
        console.error('检查上传状态失败:', error)
      }
    }
    
    // 开始上传
    const startUpload = async () => {
      if (!currentFile.value || isUploading.value) return
      
      isUploading.value = true
      isPaused.value = false
      uploadStatus.value = 'normal'
      
      // 从上次暂停的位置或从头开始上传
      await uploadChunks()
    }
    
    // 上传分片
    const uploadChunks = async () => {
      if (!currentFile.value || !isUploading.value || isPaused.value) return
      
      // 查找下一个需要上传的分片
      let nextChunk = -1
      for (let i = 0; i < uploadInfo.totalChunks; i++) {
        if (!uploadInfo.uploadedChunks.has(i)) {
          nextChunk = i
          break
        }
      }
      
      // 所有分片已上传完成
      if (nextChunk === -1) {
        await mergeAllChunks()
        return
      }
      
      uploadInfo.currentChunkIndex = nextChunk
      
      try {
        // 计算分片的起始和结束位置
        const start = nextChunk * CHUNK_SIZE
        const end = Math.min(start + CHUNK_SIZE, currentFile.value.size)
        const chunk = currentFile.value.slice(start, end)
        
        // 上传分片
        const response = await uploadChunk(
          chunk,
          uploadInfo.identifier,
          nextChunk,
          uploadInfo.totalChunks,
          currentFile.value.name
        )
        
        // 标记该分片已上传
        uploadInfo.uploadedChunks.add(nextChunk)
        
        // 更新上传进度
        uploadProgress.value = Math.floor(
          (uploadInfo.uploadedChunks.size / uploadInfo.totalChunks) * 100
        )
        
        // 继续上传下一个分片
        await uploadChunks()
      } catch (error) {
        console.error('上传分片出错:', error)
        ElMessage.error('上传分片失败，请重试')
        isUploading.value = false
        uploadStatus.value = 'exception'
      }
    }
    
    // 合并所有分片
    const mergeAllChunks = async () => {
      try {
        if (!currentFile.value) return
        
        const response = await mergeChunks(
          uploadInfo.identifier,
          currentFile.value.name,
          uploadInfo.totalChunks
        )
        
        isUploading.value = false
        uploadStatus.value = 'success'
        ElMessage.success('文件上传成功')
      } catch (error) {
        console.error('合并分片出错:', error)
        ElMessage.error('合并分片失败，请重试')
        isUploading.value = false
        uploadStatus.value = 'exception'
      }
    }
    
    // 暂停上传
    const pauseUpload = () => {
      isPaused.value = true
      isUploading.value = false
      ElMessage.info('上传已暂停')
    }
    
    // 取消上传
    const handleCancelUpload = async () => {
      try {
        // 通知服务器取消上传并清理临时文件
        await cancelUpload(uploadInfo.identifier)
        
        // 重置状态
        currentFile.value = null
        resetUploadState()
        ElMessage.info('上传已取消')
      } catch (error) {
        console.error('取消上传出错:', error)
      }
    }
    
    // 格式化文件大小
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 B'
      
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`
    }
    
    return {
      fileInput,
      currentFile,
      uploadProgress,
      isUploading,
      uploadStatus,
      handleSelectFile,
      handleFileChange,
      startUpload,
      pauseUpload,
      cancelUpload: handleCancelUpload,
      formatFileSize
    }
  }
})
</script>

<style scoped>
.upload-container {
  width: 100%;
}

.upload-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info {
  margin-bottom: 20px;
}

.upload-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.empty-tip {
  padding: 40px 0;
}
</style>