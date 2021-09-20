const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  singleSpaWebpackConfig.externals.push(
    // '@angular/common',
    // '@angular/core',
    // '@angular/platform-browser',
    // '@angular/router',
    'rxjs',
    'rxjs/operators',
    'single-spa'
  );

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
