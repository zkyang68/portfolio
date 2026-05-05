import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { watch } from 'fs'
import { exec } from 'child_process'

function profileAutoGen() {
  return {
    name: 'profile-auto-gen',
    configureServer(server: ViteDevServer) {
      const txtPath = 'myfiles/my-info.txt';
      const watcher = watch(txtPath, () => {
        exec('node scripts/generate-profile.mjs', (err, stdout, stderr) => {
          if (err) {
            console.error('[profile-auto-gen] 生成失败:', stderr);
            return;
          }
          if (stdout) console.log(stdout.trim());
          server.ws.send({ type: 'full-reload' });
        });
      });
      server.httpServer?.on('close', () => watcher.close());
      console.log('[profile-auto-gen] 正在监听 myfiles/my-info.txt 变化...');
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), profileAutoGen()],
})
