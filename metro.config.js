const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const customConfig = {
  // You can override or extend the default config here
  // e.g., resolver: { sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json'] }
};

const config = mergeConfig(getDefaultConfig(__dirname), customConfig);

module.exports = config;
