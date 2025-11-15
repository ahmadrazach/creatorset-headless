/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
        SHOPIFY_STOREFRONT_ACCESSTOKEN:
            process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    },
    images: {
        domains: [
            "cdn.shopify.com",
            "d3c4b0rnzc49yh.cloudfront.net",
            "media.discordapp.net",
            "creator-hub.s3.us-east-2.amazonaws.com",
        ],
    },
};

module.exports = nextConfig;
