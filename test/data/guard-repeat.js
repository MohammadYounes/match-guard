var matchGuard = require('../../lib/match-guard.js')

module.exports = [
  {
    'should': 'Should max out',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/\d/i, input, 'r').value
    },
    'error': 'max iterations reached [6]. Aborting!',
    'input': '1b2c3d'
  },
  {
    'should': 'Should guard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/a/i, input, 'r').value
    },
    'expected': '«1»b«1»c«1»d',
    'input': 'abacad'
  },
  {
    'should': 'Should unguard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input, 'r')
      return matchGuard.unguard(state)
    },
    'expected': 'abacad',
    'input': 'abacad'
  },
  {
    'should': 'Should save guarded tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input, 'r')
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤b¤c¤d',
    'input': 'abacad'
  },
  {
    'should': 'Should restore saved tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input, 'r')
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1»b«1»c«1»d',
    'input': 'abacad'
  },
  {
    'should': 'Should save guarded tokens except when preceeded with b',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input, 'r')
      return matchGuard.saveTokens(state.value, /b/).value
    },
    'expected': '¤b«1»¤d',
    'input': 'abacad'
  },
  {
    'should': 'Should restore saved tokens except when preceeded with b',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/a/i, input, 'r')
      var saved = matchGuard.saveTokens(state.value, /b/)
      return matchGuard.restore(saved)
    },
    'expected': '«1»b«1»c«1»d',
    'input': 'abacad'
  }
]
