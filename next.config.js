const withPWA = require('next-pwa')
const withPlugins = require("next-compose-plugins");


const nextConfig = {
  poweredByHeader: false,
  generateBuildId: async () => {
    return process.env.BUILD_ID ? process.env.BUILD_ID : "1.0.0";
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
  env: {
    BUILD_ID: process.env.BUILD_ID,
    ENDPOINT: "http://localhost:3306", // https://orderfoodtestv1.herokuapp.com
  },
};

module.exports = withPlugins([[withPWA,{
  pwa: {
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  //register: true, // deploy true
  // skipWaiting: true, // deploy true
  // runtimeCaching: [
  //   {
  //   urlPattern: /.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'static-font-assets',
  //   expiration: {
  //   maxEntries: 4,
  //   maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  //   }
  //   }
  //   },
  //   {
  //   urlPattern: /.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'static-image-assets',
  //   expiration: {
  //   maxEntries: 64,
  //   maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //   }
  //   }
  //   },
  //   {
  //   urlPattern: /.(?:js)$/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'static-js-assets',
  //   expiration: {
  //   maxEntries: 16,
  //   maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //   }
  //   }
  //   },
  //   {
  //   urlPattern: /.(?:css|less)$/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'static-style-assets',
  //   expiration: {
  //   maxEntries: 16,
  //   maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //   }
  //   }
  //   },
  //   {
  //   urlPattern: /.(?:json|xml|csv)$/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'static-data-assets',
  //   expiration: {
  //   maxEntries: 16,
  //   maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //   }
  //   }
  //   },
  //   {
  //   urlPattern: /.*/i,
  //   handler: 'NetworkFirst',
  //   options: {
  //   cacheName: 'others',
  //   expiration: {
  //   maxEntries: 16,
  //   maxAgeSeconds: 24 * 60 * 60 // 24 hours
  //   }
  //   }
  //   }
  //   ]
  }
  }]],nextConfig);