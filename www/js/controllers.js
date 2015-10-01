angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope, $user, $facebookLogin) {
  $scope.user = $user;
  $scope.facebookLogin = $facebookLogin;
});
