// Attach chai's assert interface to global for convenience
window.assert = window.chai.assert;

describe('test', function() {
  it('works', function() {
    assert.equal('A', 'A');
  });
});
