module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'http://code.jquery.com/jquery-1.9.1.js',
      'https://cdnjs.cloudflare.com/ajax/libs/chai/3.4.0/chai.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-resource.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-mocks.js',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js',
      'www/js/stopwatch.js',
      'www/js/directives/index.js',
      'www/js/templates/index.js',
      'test/*.test.js'
    ],
    frameworks: ['mocha'],
    port: 9876,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
