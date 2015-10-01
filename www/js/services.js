angular.module('starter.services', [])

.factory('$facebookLogin', function($user) {
  return function() {
    var url = 'http://localhost:3000/auth/facebook';

    var ref = window.open(url, '_blank', 'location=no');

    // For Cordova
    if (window.cordova) {
      ref.addEventListener('loadstop', function(ev) {
        if (ev.url.indexOf('/auth/facebook/callback') !== -1) {
          ref.close();
          $user.load();
        }
      });
    } else {
      // For `ionic serve --lab`. Wait for the user to close the window
      // and, when they do, check the server to see if they're now logged in.
      var interval = setInterval(function() {
        if (ref.closed) {
          $user.load();
          clearInterval(interval);
        }
      }, 100);
    }
  };
});
