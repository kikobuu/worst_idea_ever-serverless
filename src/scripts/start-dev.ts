// 开发模式启动脚本
// 1. 先解析现有压缩包
// 2. 启动文件监听
// 3. 启动Next.js开发服务器

import { processAllZipFiles, startFileWatcher } from '../lib/blog-parser';
import { spawn } from 'child_process';

console.log('Starting development mode...');

// 1. 先解析现有压缩包
console.log('Parsing existing blog packages...');
processAllZipFiles();

// 2. 启动文件监听
console.log('Starting file watcher for blog packages...');
startFileWatcher();

// 3. 启动Next.js开发服务器
console.log('Starting Next.js development server...');
const nextDev = spawn('npm', ['run', 'next:dev'], {
  stdio: 'inherit',
  shell: true
});

// 处理Next.js服务器退出
nextDev.on('exit', (code) => {
  console.log(`Next.js development server exited with code ${code}`);
  process.exit(code);
});

// 处理SIGINT信号（Ctrl+C）
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down...');
  nextDev.kill('SIGINT');
  process.exit(0);
});