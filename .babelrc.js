module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
    ],
    env: {
      development: {
        plugins: ['react-hot-loader/babel'],
      },
    },
  };
  