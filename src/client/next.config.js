/** @type{import('next').NextConfig} */
module.exports = {
  distDir: '../../.next',
  compiler: {
    emotion: true,
  },
  experimental: {
    externalDir: true,
  },
  webpack: config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // 处理浏览器端使用 dotenv fs 的依赖
    };
    return config;
  },
  // reactStrictMode: true, 会触发重复渲染 见 https://github.com/vercel/next.js/issues/35822
};
