# Projects 功能使用说明

## 目录结构

```
content/projects/
├── package/          # 存放项目压缩包（.zip 文件）
└── extracted/        # 存放解压后的项目文件夹
    └── {project-name}/
        └── pmeta.json
```

## pmeta.json 配置格式

每个项目需要一个 `pmeta.json` 配置文件，包含以下字段：

```json
{
  "title": {
    "en": "Project Name",
    "zh": "项目名称"
  },
  "type": "Game Development",
  "description": {
    "en": "Project description in English",
    "zh": "项目中文描述"
  },
  "tags": ["Tag1", "Tag2", "Tag3"],
  "demoLicense": "CC BY-NC-SA 4.0",
  "projectLicense": "MIT",
  "videoUrl": "https://www.youtube.com/watch?v=...",
  "allowDownloadDemo": true,
  "allowRequestProject": false,
  "previewImage": "/images/project-preview.jpg"
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | Object | 是 | 项目标题，支持多语言（en, zh） |
| `type` | String | 是 | 项目类型（如：Game Development, Web App, Tool） |
| `description` | Object | 是 | 项目描述，支持多语言 |
| `tags` | Array | 是 | 项目标签数组 |
| `demoLicense` | String | 是 | Demo 协议（使用 CC 协议） |
| `projectLicense` | String | 是 | 项目工程协议（MIT, Apache 2.0, GPL 等） |
| `videoUrl` | String | 否 | 项目视频链接（Bilibili 或 YouTube） |
| `allowDownloadDemo` | Boolean | 是 | 是否允许下载 Demo |
| `allowRequestProject` | Boolean | 是 | 是否允许申请拉取项目工程 |
| `previewImage` | String | 否 | 预览图链接（相对路径或绝对路径） |

## 使用流程

### 1. 创建项目压缩包

1. 创建项目文件夹，命名为项目名称（如 `my-project`）
2. 在文件夹中创建 `pmeta.json` 配置文件
3. 将文件夹压缩为 `.zip` 文件
4. 将压缩包放入 `content/projects/package/` 目录

### 2. 自动解析

- **开发模式**：运行 `npm run dev`，系统会自动解析现有压缩包并监听新文件
- **生产构建**：运行 `npm run build`，系统会在构建前自动解析所有压缩包

### 3. 处理结果

- **有效项目**：解压到 `content/projects/extracted/`，原压缩包被删除
- **无效项目**：原压缩包添加 `.fail` 后缀
- **重复项目**：基于 `pmeta.json` 内容和修改时间自动去重，保留最新版本

## 示例

参考 `content/projects/extracted/sample-project/pmeta.json` 查看完整示例。

## 注意事项

1. 确保压缩包内的文件夹名称与压缩包名称一致
2. `pmeta.json` 必须使用 UTF-8 编码
3. 图片路径建议使用相对路径，放在 `public/images/` 目录下
4. 视频链接支持 YouTube 和 Bilibili 格式
