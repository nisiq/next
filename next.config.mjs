/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
            
        }
    },
    images: {
        domains: ['127.0.0.1', 'ui-avatars.com', 'localhost'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
