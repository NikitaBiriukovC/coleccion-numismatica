// En local no hay basePath. En GitHub Pages el workflow define NEXT_PUBLIC_BASE_PATH=/nombre-del-repo
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // genera una web estática en la carpeta "out/"
  basePath: base,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
