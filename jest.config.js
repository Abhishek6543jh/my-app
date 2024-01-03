module.exports = {
  testEnvironment: 'jsdom',
  silent: true,
  // other Jest configurations...
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};