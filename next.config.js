const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

const dev = process.env.NODE_ENV !== "production";

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
    config.resolve.alias = {
      ...config.resolve.alias,
      react: "preact/compat",
      "react-dom": "preact/compat",
    };

    return config;
  },
  env: {
    BUILD_ID: process.env.BUILD_ID,
    ENDPOINT: "https://orderfoodtestv1.herokuapp.com",
    CLOUDINARY_API_KEY:'816842862175834'
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: dev,
          dest: "public",
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: "/",
              handler: "NetworkFirst",
              options: {
                cacheName: "start-url",
                expiration: {
                  maxEntries: 4,
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
              },
            },
            {
              urlPattern: /.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "static-font-assets",
                expiration: {
                  maxEntries: 4,
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
              },
            },
            {
              urlPattern: /.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "static-image-assets",
                expiration: {
                  maxEntries: 64,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
            {
              urlPattern: /.(?:js)$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "static-js-assets",
                expiration: {
                  maxEntries: 16,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
            {
              urlPattern: /.(?:css|less|scss)$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "static-style-assets",
                expiration: {
                  maxEntries: 16,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
            {
              urlPattern: /.(?:json|xml|csv)$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "static-data-assets",
                expiration: {
                  maxEntries: 16,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
            {
              urlPattern: /.*(\/api\/)/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'others',
                expiration: {
                  maxEntries: 16,
                  maxAgeSeconds: 24 * 60 * 60 // 24 hours
                }
              }
            },
          ],
        },
      },
    ],
  ],
  nextConfig
);
