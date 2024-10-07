/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend.chatbase.co',
                port: '',
                pathname: '/**'

            }
        ]
    }
};

export default nextConfig;
