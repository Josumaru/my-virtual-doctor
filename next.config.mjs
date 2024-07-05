/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "tqyc9j91irdxtfh1.public.blob.vercel-storage.com"
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
