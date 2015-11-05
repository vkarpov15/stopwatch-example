(function() {
  var stopwatch = angular.module('stopwatch', ['core', 'templates', 'ng']);

  stopwatch.config(function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(req) {
          // Transform **all** $http calls so that requests that go to `/`
          // instead go to a different origin, in this case localhost:3000
          if (req.url.charAt(0) === '/') {
            req.url = 'http://localhost:3000' + req.url;
            // and make sure to send cookies too
            req.withCredentials = true;
          }

          return req;
        }
      };
    });
  });

  stopwatch.run(function($rootScope) {
    $rootScope.$on('NEW_TIME_SAVED', function(ev, time) {
      $rootScope.$broadcast('NEW_TIME', time);
    });
  });
})();
