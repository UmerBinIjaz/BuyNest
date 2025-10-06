/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true
    },
    experimental: {
        turbo: false, // disable Turbopack
    },
};

export default nextConfig;
