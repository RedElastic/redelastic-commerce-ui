import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-validation')
    .feature('resources');

  if (environment.debug) {
    aurelia.use
      .developmentLogging()
      .plugin('aurelia-validation');
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
