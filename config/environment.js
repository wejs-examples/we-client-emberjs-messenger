/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'we-client-emberjs-messenger',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' http://localhost:4000 ",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:4000/ ws://localhost:4000 ",
      'img-src': "'self' http://localhost:4000/ ",
      'style-src': "'self' 'unsafe-inline' ",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:token'
  };

  ENV['simple-auth-token'] = {
    serverTokenEndpoint: 'http://localhost:4000/auth/login-for-token',
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},

    // refreshAccessTokens: true,
    // timeFactor: 1,
    // refreshLeeway: 300 // Refresh the token 5 minutes (300s) before it expires.
  };

  // // avaible configs
  // ENV['simple-auth-token'] = {
  //   serverTokenEndpoint: '/api-token-auth/',
  //   identificationField: 'username',
  //   passwordField: 'password',
  //   tokenPropertyName: 'token',
  //   authorizationPrefix: 'Bearer ',
  //   authorizationHeaderName: 'Authorization',
  //   headers: {},
  //   refreshAccessTokens: true,
  //   serverTokenRefreshEndpoint: '/api-token-refresh/',
  //   tokenExpireName: 'exp',
  //   refreshLeeway: 0,
  //   timeFactor: 1  // example - set to "1000" to convert incoming seconds to milliseconds.
  // };

  return ENV;
};
