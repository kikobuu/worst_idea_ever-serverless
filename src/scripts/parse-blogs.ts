// 博客解析脚本 - 在构建前运行
import { processAllZipFiles } from '../lib/blog-parser';

console.log('Starting blog parsing process...');

const success = processAllZipFiles();

if (success) {
  console.log('Blog parsing completed successfully!');
  process.exit(0);
} else {
  console.error('Blog parsing failed!');
  process.exit(1);
}