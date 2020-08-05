const path = require('path');

module.exports = {
    ignore: [
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
        '**/homepage/**',
        '**/Footer.js',
        '**/login/**',
    ],
    require: [path.join(__dirname, 'src/styles/index.scss')],
};
