import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function run(cmd, label) {
  console.log(`\n[${label}]`);
  try {
    const out = execSync(cmd, { encoding: 'utf-8', cwd: ROOT });
    if (out.trim()) console.log(out.trim());
  } catch (err) {
    console.error(err.stderr || err.message);
    process.exit(1);
  }
}

// Step 1: Generate profile from txt
run('node scripts/generate-profile.mjs', '1/5 生成 profile.ts');

// Step 2: Build
run('npm run build', '2/5 构建');

// Step 3: Stage & commit
const status = execSync('git status --porcelain', { encoding: 'utf-8', cwd: ROOT });
if (status.trim()) {
  run('git add -A', '3/5 暂存文件');
  run('git commit -m "sync: 更新个人资料 [skip ci]"', '4/5 提交');
  run('git push origin master', '5/5 推送代码');
  run('npm run deploy', '部署 GitHub Pages');
  console.log('\n✅ 同步完成！https://zkyang68.github.io/portfolio/');
} else {
  console.log('\n⏭  没有变更，跳过提交');
}
