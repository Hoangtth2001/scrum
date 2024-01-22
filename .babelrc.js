const plugins = [['babel-plugin-direct-import', { modules: ['@mui/material', '@mui/icons-material'] }]];

const presets = [
  [
    '@babel/preset-env',
    {
      loose: true,
      modules: false,
    },
  ],
];

module.exports = { plugins, presets };
