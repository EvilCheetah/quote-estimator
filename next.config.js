/** @type {import('next').NextConfig} */

nextConfig = {
    async headers()
    {
        return [
            {
                source:  '/quote/:path*',
                headers: [
                    {
                        key:   "Access-Control-Allow-Credentials",
                        value: "true"
                    },
                    {
                        key:   "Access-Control-Allow-Origin",
                        value: "httos://localhost:3000"
                    },
                ],
            }
        ];
    }
}


module.exports = nextConfig