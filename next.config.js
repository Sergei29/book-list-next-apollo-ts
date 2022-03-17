/** @type {import('next').NextConfig} */
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv()

const objConfig = {
  reactStrictMode: true,
}

module.exports = withNextEnv(objConfig)
