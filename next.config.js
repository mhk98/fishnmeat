const nextSettings = {
    //transpilePackages: ['ahooks'],
    optimizeFonts: false,

    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        title: 'Martfury',
        titleDescription: 'Multipurpose Marketplace React Ecommerce Template',
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/**', // Adjust the path if needed
            },
        ],
    },
    
};

module.exports = nextSettings;
