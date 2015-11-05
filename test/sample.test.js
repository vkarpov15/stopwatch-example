// Attach chai's assert interface to global for convenience
window.assert = window.chai.assert;

describe('timer directive', function() {
  var parentScope;
  var scope;
  var element;
  var httpBackend;

  beforeEach(function() {
    var injector = angular.injector(['stopwatch', 'ngMockE2E']);

    injector.invoke(function($rootScope, $compile, $httpBackend) {
      parentScope = $rootScope.$new();
      httpBackend = $httpBackend;

      parentScope.onSaved = function(time) {
        parentScope.onSaved.calls.push(time);
      };
      parentScope.onSaved.calls = [];

      var html = '<timer on-time-saved="onSaved(time);"></timer>';
      element = $compile(html)(parentScope);
      parentScope.$apply();

      // Use the directive's top-level scope, since the directive creates a
      // new one.
      scope = parentScope.$$childHead;
    });
  });

  it('can start/stop the timer and persist to the server', function(done) {
    assert.ok(!element.find('button[ng-click="startTimer()"]').
      hasClass('ng-hide'));
    element.find('button[ng-click="startTimer()"]').click();
    assert.equal(scope.state, 'RUNNING');
    assert.equal(scope.ms, 0);
    assert.ok(element.find('button[ng-click="startTimer()"]').
      hasClass('ng-hide'));
    assert.ok(!element.find('button[ng-click="stopTimer()"]').
      hasClass('ng-hide'));

    setTimeout(function() {
      assert.equal(scope.ms, 1000);
      element.find('button[ng-click="stopTimer()"]').click();
      assert.equal(scope.state, 'STOPPED');

      var validateData = function(data) {
        assert.deepEqual(JSON.parse(data), { time: 1000 });
        return true;
      };

      httpBackend.expectPOST('http://localhost:3000/api/Times', validateData).
        respond(200, { result: 'success' });
      element.find('button[ng-click="save()"]').click();
      httpBackend.flush();

      assert.equal(scope.state, 'SUCCESS');
      assert.equal(parentScope.onSaved.calls.length, 1);
      assert.deepEqual(parentScope.onSaved.calls[0].result, 'success');

      done();
    }, 1100);
  });
});
