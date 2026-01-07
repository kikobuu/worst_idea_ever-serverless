import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { ProjectMeta } from './project';

const PAK_DIRECTORY = path.join(process.cwd(), 'content/projects/package');
const PROJECT_DIRECTORY = path.join(process.cwd(), 'content/projects/extracted');
const TEMP_DIRECTORY = path.join(process.cwd(), 'temp');

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function validatePmetaJson(metaPath: string): boolean {
  try {
    if (!fs.existsSync(metaPath)) {
      console.error('pmeta.json file not found:', metaPath);
      return false;
    }

    const metaContent = fs.readFileSync(metaPath, 'utf8');
    const meta = JSON.parse(metaContent) as ProjectMeta;

    if (!meta.title || typeof meta.title !== 'object') {
      console.error('Invalid title field in pmeta.json:', metaPath);
      return false;
    }
    if (!meta.type || typeof meta.type !== 'string') {
      console.error('Invalid type field in pmeta.json:', metaPath);
      return false;
    }
    if (!meta.description || typeof meta.description !== 'object') {
      console.error('Invalid description field in pmeta.json:', metaPath);
      return false;
    }
    if (!Array.isArray(meta.tags)) {
      console.error('Invalid tags field in pmeta.json:', metaPath);
      return false;
    }
    if (!meta.demoLicense || typeof meta.demoLicense !== 'string') {
      console.error('Invalid demoLicense field in pmeta.json:', metaPath);
      return false;
    }
    if (!meta.projectLicense || typeof meta.projectLicense !== 'string') {
      console.error('Invalid projectLicense field in pmeta.json:', metaPath);
      return false;
    }
    if (typeof meta.allowDownloadDemo !== 'boolean') {
      console.error('Invalid allowDownloadDemo field in pmeta.json:', metaPath);
      return false;
    }
    if (typeof meta.allowRequestProject !== 'boolean') {
      console.error('Invalid allowRequestProject field in pmeta.json:', metaPath);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating pmeta.json:', metaPath, error);
    return false;
  }
}

function validateExtractedFiles(dirPath: string): boolean {
  console.log('Validating extracted files:', dirPath);

  const metaPath = path.join(dirPath, 'pmeta.json');
  if (!validatePmetaJson(metaPath)) {
    return false;
  }

  return true;
}

function areProjectsIdentical(newProjectPath: string, existingProjectPath: string): boolean {
  try {
    const newMetaPath = path.join(newProjectPath, 'pmeta.json');
    const existingMetaPath = path.join(existingProjectPath, 'pmeta.json');

    if (!fs.existsSync(newMetaPath) || !fs.existsSync(existingMetaPath)) {
      return false;
    }

    const newMeta = fs.readFileSync(newMetaPath, 'utf8');
    const existingMeta = fs.readFileSync(existingMetaPath, 'utf8');

    return newMeta === existingMeta;
  } catch (error) {
    console.error('Error comparing projects:', error);
    return false;
  }
}

function getFileModifiedTime(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    console.error('Error getting file modified time:', error);
    return new Date(0);
  }
}

function handleProjectDuplication(newProjectDir: string, projectSlug: string): boolean {
  const existingProjectPath = path.join(PROJECT_DIRECTORY, projectSlug);

  if (!fs.existsSync(existingProjectPath)) {
    return true;
  }

  if (!areProjectsIdentical(newProjectDir, existingProjectPath)) {
    console.log('Project content has changed, replacing existing project:', projectSlug);
    return true;
  }

  const newProjectMetaPath = path.join(newProjectDir, 'pmeta.json');
  const existingProjectMetaPath = path.join(existingProjectPath, 'pmeta.json');

  const newModifiedTime = getFileModifiedTime(newProjectMetaPath);
  const existingModifiedTime = getFileModifiedTime(existingProjectMetaPath);

  if (newModifiedTime > existingModifiedTime) {
    console.log('Newer project version found, replacing existing project:', projectSlug);
    return true;
  } else {
    console.log('Older project version found, skipping:', projectSlug);
    return false;
  }
}

function cleanupTempFiles(tempPath: string) {
  if (fs.existsSync(tempPath)) {
    fs.rmSync(tempPath, { recursive: true, force: true });
  }
}

function processZipFile(zipPath: string): boolean {
  try {
    console.log('Processing zip file:', zipPath);

    ensureDirectoryExists(TEMP_DIRECTORY);

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    let rootDirName = '';
    if (zipEntries.length > 0) {
      const firstEntry = zipEntries[0];
      if (firstEntry.isDirectory) {
        rootDirName = firstEntry.entryName;
      } else {
        rootDirName = path.basename(zipPath, path.extname(zipPath));
      }
    }

    const tempExtractPath = path.join(TEMP_DIRECTORY, rootDirName);
    zip.extractAllTo(tempExtractPath, true);

    if (!validateExtractedFiles(tempExtractPath)) {
      console.error('Invalid files in zip:', zipPath);
      cleanupTempFiles(tempExtractPath);
      
      const failPath = `${zipPath}.fail`;
      fs.renameSync(zipPath, failPath);
      console.log('Marked zip as failed:', failPath);
      return false;
    }

    const projectSlug = path.basename(rootDirName);
    if (!handleProjectDuplication(tempExtractPath, projectSlug)) {
      cleanupTempFiles(tempExtractPath);
      fs.unlinkSync(zipPath);
      console.log('Deleted duplicate zip file:', zipPath);
      return true;
    }

    const targetProjectPath = path.join(PROJECT_DIRECTORY, projectSlug);
    
    if (fs.existsSync(targetProjectPath)) {
      fs.rmSync(targetProjectPath, { recursive: true, force: true });
    }
    
    fs.renameSync(tempExtractPath, targetProjectPath);
    console.log('Successfully moved project to:', targetProjectPath);

    fs.unlinkSync(zipPath);
    console.log('Deleted processed zip file:', zipPath);

    return true;
  } catch (error) {
    console.error('Error processing zip file:', zipPath, error);
    return false;
  } finally {
    cleanupTempFiles(TEMP_DIRECTORY);
  }
}

function processAllZipFiles() {
  try {
    console.log('Processing all zip files in:', PAK_DIRECTORY);

    ensureDirectoryExists(PAK_DIRECTORY);
    ensureDirectoryExists(PROJECT_DIRECTORY);

    const files = fs.readdirSync(PAK_DIRECTORY);
    const zipFiles = files.filter(file => file.endsWith('.zip') && !file.endsWith('.fail.zip'));

    console.log('Found', zipFiles.length, 'zip files to process');

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
      }, 1000);
    }
  });
}

export { processAllZipFiles, startFileWatcher };
