import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { BlogMeta } from './blog';

// 定义常量
const PAK_DIRECTORY = path.join(process.cwd(), 'content/pak');
const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');
const TEMP_DIRECTORY = path.join(process.cwd(), 'temp');

// 确保目录存在
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 验证meta.json文件
function validateMetaJson(metaPath: string): boolean {
  try {
    if (!fs.existsSync(metaPath)) {
      console.error('meta.json file not found:', metaPath);
      return false;
    }

    const metaContent = fs.readFileSync(metaPath, 'utf8');
    const meta = JSON.parse(metaContent) as BlogMeta;

    // 验证必填字段
    if (!meta.title || typeof meta.title !== 'object') {
      console.error('Invalid title field in meta.json:', metaPath);
      return false;
    }
    if (!meta.description || typeof meta.description !== 'object') {
      console.error('Invalid description field in meta.json:', metaPath);
      return false;
    }
    if (!meta.date || isNaN(Date.parse(meta.date))) {
      console.error('Invalid date field in meta.json:', metaPath);
      return false;
    }
    if (!Array.isArray(meta.tags)) {
      console.error('Invalid tags field in meta.json:', metaPath);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating meta.json:', metaPath, error);
    return false;
  }
}

// 验证Markdown文件
function validateMarkdownFiles(dirPath: string): boolean {
  try {
    const files = fs.readdirSync(dirPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    if (mdFiles.length === 0) {
      console.error('No Markdown files found in:', dirPath);
      return false;
    }

    // 简单验证Markdown语法（基本检查）
    for (const mdFile of mdFiles) {
      const mdPath = path.join(dirPath, mdFile);
      const content = fs.readFileSync(mdPath, 'utf8');
      
      // 检查文件是否为空
      if (!content.trim()) {
        console.error('Empty Markdown file:', mdPath);
        return false;
      }

      // 这里可以添加更复杂的Markdown验证
    }

    return true;
  } catch (error) {
    console.error('Error validating Markdown files:', dirPath, error);
    return false;
  }
}

// 检查Mermaid图表语法（简单验证）
function validateMermaidSyntax(content: string): boolean {
  try {
    // 提取所有Mermaid图表代码块
    const mermaidRegex = /```mermaid\s*([\s\S]*?)\s*```/g;
    let match;

    while ((match = mermaidRegex.exec(content)) !== null) {
      const chartCode = match[1].trim();
      if (!chartCode) {
        continue;
      }

      // 简单验证：检查是否包含有效的Mermaid关键字
      const validMermaidKeywords = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'gantt', 'pie', 'journey'];
      const hasValidKeyword = validMermaidKeywords.some(keyword => chartCode.includes(keyword));
      
      if (!hasValidKeyword) {
        console.error('Invalid Mermaid diagram detected (no valid keyword):', chartCode.substring(0, 50) + '...');
        // 注意：这里只是简单验证，不保证能正确渲染
      }
    }

    return true;
  } catch (error) {
    console.error('Error validating Mermaid syntax:', error);
    return false;
  }
}

// 验证解压后的文件有效性
function validateExtractedFiles(dirPath: string): boolean {
  console.log('Validating extracted files:', dirPath);

  // 检查meta.json
  const metaPath = path.join(dirPath, 'meta.json');
  if (!validateMetaJson(metaPath)) {
    return false;
  }

  // 检查Markdown文件
  if (!validateMarkdownFiles(dirPath)) {
    return false;
  }

  // 检查Mermaid语法
  const files = fs.readdirSync(dirPath);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  
  for (const mdFile of mdFiles) {
    const mdPath = path.join(dirPath, mdFile);
    const content = fs.readFileSync(mdPath, 'utf8');
    if (!validateMermaidSyntax(content)) {
      return false;
    }
  }

  return true;
}

// 比较两个博客是否相同（基于meta.json内容和文件名）
function areBlogsIdentical(newBlogPath: string, existingBlogPath: string): boolean {
  try {
    const newMetaPath = path.join(newBlogPath, 'meta.json');
    const existingMetaPath = path.join(existingBlogPath, 'meta.json');

    if (!fs.existsSync(newMetaPath) || !fs.existsSync(existingMetaPath)) {
      return false;
    }

    const newMeta = fs.readFileSync(newMetaPath, 'utf8');
    const existingMeta = fs.readFileSync(existingMetaPath, 'utf8');

    // 比较meta.json内容
    return newMeta === existingMeta;
  } catch (error) {
    console.error('Error comparing blogs:', error);
    return false;
  }
}

// 获取文件的修改时间
function getFileModifiedTime(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    console.error('Error getting file modified time:', error);
    return new Date(0); // 返回1970-01-01作为默认值
  }
}

// 处理博客去重
function handleBlogDuplication(newBlogDir: string, blogSlug: string): boolean {
  const existingBlogPath = path.join(BLOG_DIRECTORY, blogSlug);

  // 如果博客不存在，直接移动
  if (!fs.existsSync(existingBlogPath)) {
    return true;
  }

  // 检查是否为相同博客
  if (!areBlogsIdentical(newBlogDir, existingBlogPath)) {
    console.log('Blog content has changed, replacing existing blog:', blogSlug);
    return true;
  }

  // 获取修改时间
  const newBlogMetaPath = path.join(newBlogDir, 'meta.json');
  const existingBlogMetaPath = path.join(existingBlogPath, 'meta.json');

  const newModifiedTime = getFileModifiedTime(newBlogMetaPath);
  const existingModifiedTime = getFileModifiedTime(existingBlogMetaPath);

  // 比较修改时间，保留较新的
  if (newModifiedTime > existingModifiedTime) {
    console.log('Newer blog version found, replacing existing blog:', blogSlug);
    return true;
  } else {
    console.log('Older blog version found, skipping:', blogSlug);
    return false;
  }
}

// 清理临时文件
function cleanupTempFiles(tempPath: string) {
  if (fs.existsSync(tempPath)) {
    fs.rmSync(tempPath, { recursive: true, force: true });
  }
}

// 处理单个压缩包
function processZipFile(zipPath: string): boolean {
  try {
    console.log('Processing zip file:', zipPath);

    // 确保临时目录存在
    ensureDirectoryExists(TEMP_DIRECTORY);

    // 解压压缩包
    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    // 获取压缩包内的根目录名称
    let rootDirName = '';
    if (zipEntries.length > 0) {
      const firstEntry = zipEntries[0];
      if (firstEntry.isDirectory) {
        rootDirName = firstEntry.entryName;
      } else {
        // 如果压缩包内没有目录，使用文件名作为根目录名
        rootDirName = path.basename(zipPath, path.extname(zipPath));
      }
    }

    // 解压到临时目录
    const tempExtractPath = path.join(TEMP_DIRECTORY, rootDirName);
    zip.extractAllTo(tempExtractPath, true);

    // 验证解压后的文件
    if (!validateExtractedFiles(tempExtractPath)) {
      console.error('Invalid files in zip:', zipPath);
      cleanupTempFiles(tempExtractPath);
      
      // 为原压缩包添加.fail后缀
      const failPath = `${zipPath}.fail`;
      fs.renameSync(zipPath, failPath);
      console.log('Marked zip as failed:', failPath);
      return false;
    }

    // 处理去重
    const blogSlug = path.basename(rootDirName);
    if (!handleBlogDuplication(tempExtractPath, blogSlug)) {
      cleanupTempFiles(tempExtractPath);
      // 删除原压缩包
      fs.unlinkSync(zipPath);
      console.log('Deleted duplicate zip file:', zipPath);
      return true;
    }

    // 移动到博客目录
    const targetBlogPath = path.join(BLOG_DIRECTORY, blogSlug);
    
    // 如果目标目录存在，先删除
    if (fs.existsSync(targetBlogPath)) {
      fs.rmSync(targetBlogPath, { recursive: true, force: true });
    }
    
    // 移动解压后的目录到博客目录
    fs.renameSync(tempExtractPath, targetBlogPath);
    console.log('Successfully moved blog to:', targetBlogPath);

    // 删除原压缩包
    fs.unlinkSync(zipPath);
    console.log('Deleted processed zip file:', zipPath);

    return true;
  } catch (error) {
    console.error('Error processing zip file:', zipPath, error);
    return false;
  } finally {
    // 清理临时文件
    cleanupTempFiles(TEMP_DIRECTORY);
  }
}

// 处理所有压缩包
function processAllZipFiles() {
  try {
    console.log('Processing all zip files in:', PAK_DIRECTORY);

    // 确保目录存在
    ensureDirectoryExists(PAK_DIRECTORY);
    ensureDirectoryExists(BLOG_DIRECTORY);

    // 获取所有zip文件
    const files = fs.readdirSync(PAK_DIRECTORY);
    const zipFiles = files.filter(file => file.endsWith('.zip') && !file.endsWith('.fail.zip'));

    console.log('Found', zipFiles.length, 'zip files to process');

    // 处理每个zip文件
    for (const zipFile of zipFiles) {
      const zipPath = path.join(PAK_DIRECTORY, zipFile);
      processZipFile(zipPath);
    }

    return true;
  } catch (error) {
    console.error('Error processing all zip files:', error);
    return false;
  }
}

// 启动文件监听（开发模式）
function startFileWatcher() {
  console.log('Starting file watcher for:', PAK_DIRECTORY);

  ensureDirectoryExists(PAK_DIRECTORY);

  fs.watch(PAK_DIRECTORY, (eventType, filename) => {
    if (eventType === 'rename' && filename && filename.endsWith('.zip') && !filename.endsWith('.fail.zip')) {
      console.log('Detected new zip file:', filename);
      setTimeout(() => {
        const zipPath = path.join(PAK_DIRECTORY, filename);
        if (fs.existsSync(zipPath)) {
          processZipFile(zipPath);
        }
      }, 1000); // 延迟处理，确保文件完全写入
    }
  });
}

export { processAllZipFiles, startFileWatcher };