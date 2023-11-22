/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['static.finnhub.io'],
    },
};

module.exports = {
images: {
    remotePatterns: [
    {
        protocol: 'https',
        hostname: 'static.finnhub.io',
        port: '',
        pathname: '',
    },
    ],
},
}

module.exports = nextConfig
