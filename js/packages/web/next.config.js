const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');

const assetPrefix = process.env.ASSET_PREFIX || '';

const linguiConfig = require('./lingui.config.js')

const { locales, sourceLocale } = linguiConfig

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@primary-color': '#768BF9',
            '@text-color': 'rgba(255, 255, 255)',
            '@assetPrefix': assetPrefix || "''",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
];

module.exports = withPlugins(plugins, {
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]

    return config
  },
  assetPrefix,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },

  env: {
    NEXT_PUBLIC_STORE_OWNER_ADDRESS:
      process.env.STORE_OWNER_ADDRESS ||
      process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS,
    NEXT_PUBLIC_STORE_ADDRESS: process.env.STORE_ADDRESS,
    NEXT_PUBLIC_BIG_STORE: process.env.REACT_APP_BIG_STORE,
    NEXT_PUBLIC_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,

    NEXT_SPL_TOKEN_MINTS: process.env.SPL_TOKEN_MINTS,
    NEXT_CG_SPL_TOKEN_IDS: process.env.CG_SPL_TOKEN_IDS,
    NEXT_ENABLE_NFT_PACKS: process.env.REACT_APP_ENABLE_NFT_PACKS,
    NEXT_ENABLE_NFT_PACKS_REDEEM: process.env.REACT_APP_ENABLE_NFT_PACKS_REDEEM,

    // account detail info
    TWITTER_URL: process.env.TWITTER_URL,
    SPOTIFY_URL: process.env.SPOTIFY_URL,
    INSTAGRAM_URL: process.env.INSTAGRAM_URL,
    WEB_URL: process.env.WEB_URL,
    IS_ACCOUNT_MAIN: process.env.IS_ACCOUNT_MAIN,
    PROFILE_IMG_URL: process.env.PROFILE_IMG_URL,
    BANNER_IMG_URL: process.env.BANNER_IMG_URL,
    ACCOUNT_NAME: process.env.ACCOUNT_NAME,
    ACCOUNT_DESCRIPTION: process.env.ACCOUNT_DESCRIPTION,

    SERVICE_NAME: process.env.SERVICE_NAME,
    CAMPANY_NAME: process.env.CAMPANY_NAME,
    MAIN_ACCOUNT_ARWEAVE_TRANSACTION: process.env.MAIN_ACCOUNT_ARWEAVE_TRANSACTION
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
});
