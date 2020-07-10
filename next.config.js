require('dotenv').config()
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    poweredByHeader: false,
    generateBuildId: async () => {
      return process.env.BUILD_ID ? process.env.BUILD_ID : "1.0.0"
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
      return config
    },
    env: {
      BUILD_ID: process.env.BUILD_ID
    }
  }

  module.exports = withPlugins([
    // add plugins here..
  ], nextConfig);