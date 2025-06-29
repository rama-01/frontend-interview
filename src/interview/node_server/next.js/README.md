# Next.js 大文件上传与断点续传服务器

这是一个基于Next.js实现的大文件上传和断点续传服务器示例。

## 功能特点

- 支持大文件分片上传
- 断点续传
- 文件秒传
- 自动清理过期临时文件
- 跨域支持

## 技术栈

- Next.js
- Node.js
- formidable (用于处理文件上传)

## 项目结构

```
├── config/             # 配置文件
│   └── index.js        # 应用配置
├── pages/              # Next.js页面
│   └── api/            # API路由
│       └── upload/     # 上传相关API
│           ├── chunk.js    # 分片上传
│           ├── merge.js    # 合并分片
│           ├── status.js   # 上传状态
│           └── cancel.js   # 取消上传
├── utils/              # 工具函数
│   ├── fileUtils.js    # 文件处理工具
│   └── cleanupTask.js  # 临时文件清理任务
├── middleware.js       # 中间件
├── index.js            # 应用入口
└── package.json        # 项目依赖
```

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 手动清理临时文件
npm run cleanup
```

## API接口

### 1. 获取上传状态

```
GET /api/upload/status?identifier={fileIdentifier}
```

返回已上传的分片信息，用于断点续传。

### 2. 上传分片

```
POST /api/upload/chunk
```

请求体为FormData，包含以下字段：
- `chunk`: 文件分片
- `identifier`: 文件唯一标识
- `chunkIndex`: 分片索引
- `totalChunks`: 总分片数
- `filename`: 文件名

### 3. 合并分片

```
POST /api/upload/merge
```

请求体为JSON，包含以下字段：
- `identifier`: 文件唯一标识
- `filename`: 文件名
- `totalChunks`: 总分片数

### 4. 取消上传

```
DELETE /api/upload/cancel?identifier={fileIdentifier}
```

取消上传并清理临时文件。

## 实现原理

### 分片上传流程

1. **接收分片**：通过formidable解析上传的分片文件
2. **存储分片**：将分片存储在临时目录中，按文件标识符和分片索引组织
3. **记录信息**：保存文件信息，包括文件名、总分片数等

### 断点续传支持

1. **查询已上传分片**：提供API返回已上传的分片索引
2. **续传逻辑**：前端根据已上传分片信息，只上传缺失的分片

### 文件合并

1. **检查分片完整性**：验证所有分片是否已上传
2. **按顺序合并**：将分片按索引顺序合并成完整文件
3. **清理临时文件**：合并完成后清理临时分片

### 临时文件清理

1. **定时任务**：定期检查临时目录中的文件
2. **过期判断**：根据文件修改时间判断是否过期
3. **自动清理**：删除过期的临时文件和目录

## 注意事项

- 本示例仅用于学习和演示，生产环境使用需要增加更多的安全措施
- 服务器需要足够的存储空间来处理大文件上传
- 建议配置适当的文件大小限制和类型限制
- 生产环境中应考虑使用更可靠的存储方案，如对象存储服务