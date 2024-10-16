const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        //source: '/api/:path*',
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
//          {
//            key: 'Strict-Transport-Security',
//            value: 'max-age=63072000; includeSubDomains; preload'
//          },
//          {
//            key: 'X-XSS-Protection',
//            value: '1; mode=block'
//          },
//          {
//            key: 'X-Frame-Options',
//            value: 'SAMEORIGIN'
//          },
//          {
//            key: 'X-Content-Type-Options',
//            value: 'nosniff'
//          },
//          {
//            key: 'Referrer-Policy',
//            value: 'strict-origin'
//          },
//          {
//            key: 'Permissions-Policy',
//            value: 'camera=(), microphone=(), geolocation=()'
//          },
//          {
//            key: 'Access-Control-Allow-Credentials',
//              value: 'true'
//          },
//          {
//            key: 'Access-Control-Allow-Origin',
//            value: process.env.NEXT_PUBLIC_API_URL
//          },
//          {
//            key: 'Access-Control-Allow-Methods',
//            value: 'GET,DELETE,PATCH,POST,PUT'
//          },
//          {
//            key: 'Access-Control-Allow-Headers',
//            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//          },
        ],
      },
    ];
  },
};
