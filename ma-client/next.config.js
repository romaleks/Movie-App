/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    APP_ENV: process.env.REACT_APP_ENV,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:4200/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `http://localhost:4200/uploads/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
