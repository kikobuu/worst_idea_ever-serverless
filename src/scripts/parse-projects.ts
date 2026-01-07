import { processAllZipFiles } from '../lib/project-parser';

console.log('Starting project parsing process...');

const success = processAllZipFiles();

if (success) {
  console.log('Project parsing completed successfully!');
  process.exit(0);
} else {
  console.error('Project parsing failed!');
  process.exit(1);
}
