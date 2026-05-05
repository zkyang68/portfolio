将你的照片和背景图放在这个文件夹中：

1. 个人照片 → 命名为 photo.jpg（推荐 400x400px，正方形）
2. 背景图片 → 命名为 hero-bg.jpg（推荐 1920x1080px）

然后在 src/data/profile.ts 中设置：
  avatarUrl: '/images/photo.jpg',
  heroBackgroundUrl: '/images/hero-bg.jpg',

或者编辑 myfiles/my-info.txt 后运行 npm run generate 自动生成。
