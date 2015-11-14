'use strict';

module.exports = {

  'serverport': 3000,
  'sourceDir': './src/',
  'buildDir': './__build__/',

  'scripts': {
    'src': './src/js/**/*.js',
    'dest': './__build__/js/'
  },

  'images': {
    'src': './src/images/**/*.{jpeg,jpg,png}',
    'dest': './__build__/images/'
  },

  'styles': {
    'src': './src/styles/**/*.scss',
    'dest': './__build__/css/'
  },
};
