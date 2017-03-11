/* global describe */
/* global it */
var assert = require('assert')
var tests = {
  '# guard': require('./data/guard.js'),
  '# guard (repeat)': require('./data/guard-repeat.js'),
  '# guard (indexed)': require('./data/guard-indexed.js'),
  '# guard (indexed, repeat) ': require('./data/guard-indexed-repeat.js')
}
var key
for (key in tests) {
  var group = tests[key]
  describe(key, function () {
    for (var i = 0; i < group.length; i++) {
      var item = group[i]
      ;(function (test) {
        it(test.should, function (done) {
          if (test.error) {
            assert.throws(function () { test.run(test.input) }, test.error)
          } else {
            assert.equal(test.run(test.input), test.expected)
          }
          done()
        })
      })(item)
    }
  })
}
