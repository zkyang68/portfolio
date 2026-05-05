import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public', 'images', 'ph.jpg');
const DEST = join(ROOT, 'public', 'images', 'ph.jpg');

const img = sharp(SRC);
const meta = await img.metadata();
console.log(`原始: ${meta.width}x${meta.height}, ${meta.format}`);

// 2x upscale with Lanczos + sharpen
await img
  .resize(meta.width * 2, meta.height * 2, { kernel: 'lanczos3' })
  .sharpen({ sigma: 0.8, m1: 0.3, m2: 0.1 })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(DEST + '.enhanced.jpg');

// Replace original
import { copyFileSync, renameSync, unlinkSync } from 'fs';
unlinkSync(DEST);
renameSync(DEST + '.enhanced.jpg', DEST);

const meta2 = await sharp(DEST).metadata();
console.log(`增强后: ${meta2.width}x${meta2.height}`);
console.log('✅ 头像已增强');
