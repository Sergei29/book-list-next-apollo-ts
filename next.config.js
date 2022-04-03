/** @type {import('next').NextConfig} */
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv()

const objConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     process: false,
  //     buffer: false,
  //     path: false,
  //     stream: false,
  //     constants: false,
  //     http: false,
  //     https: false,
  //   }

  //   return config
  // },
}

module.exports = withNextEnv(objConfig)
