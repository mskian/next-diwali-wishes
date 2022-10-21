/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  images: {
    domains: ["images.weserv.nl", "localhost", "diwali.sanweb.info"],
  },
}
