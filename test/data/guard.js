var matchGuard = require('../../lib/match-guard.js')

module.exports = [
  {
    'should': 'Should guard first occurence',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/a/i, input).value
    },
    'expected': '«1»bacad',
    'input': 'abacad'
  },
  {
    'should': 'Should unguard first occurence',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input)
      return matchGuard.unguard(state)
    },
    'expected': 'abacad',
    'input': 'abacad'
  },
  {
    'should': 'Should save guarded token',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input)
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤bacad',
    'input': 'abacad'
  },
  {
    'should': 'Should restore saved token"',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input)
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1»bacad',
    'input': 'abacad'
  },
  {
    'should': 'Should guard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/a/ig, input).value
    },
    'expected': '«1»b«1»c«1»d',
    'input': 'abacad'
  },
  {
    'should': 'Should unguard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/ig, input)
      return matchGuard.unguard(state)
    },
    'expected': 'abacad',
    'input': 'abacad'
  },
  {
    'should': 'Should save guarded tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/ig, input)
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤b¤c¤d',
    'input': 'abacad'
  },
  {
    'should': 'Should restore saved tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/ig, input)
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1»b«1»c«1»d',
    'input': 'abacad'
  }
]
