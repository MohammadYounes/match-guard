var matchGuard = require('../../lib/match-guard.js')

module.exports = [
  {
    'should': 'Should max out',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/[a1!]/i, input, 'xr').value
    },
    'error': 'max iterations reached [6]. Aborting!',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should guard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/[a?!]/i, input, 'xr').value
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab?c!d'
  },
  {
    'should': 'Should unguard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a?!]/i, input, 'xr')
      return matchGuard.unguard(state)
    },
    'expected': 'ab?c!d',
    'input': 'ab?c!d'
  },
  {
    'should': 'Should save all tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a?!]/i, input, 'xr')
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤b¤c¤d',
    'input': 'ab?c!d'
  },
  {
    'should': 'Should restore all tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a?!]/i, input, 'xr')
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab?c!d'
  },
  {
    'should': 'Should save all tokens except when preceeded with b',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a?!]/i, input, 'xr')
      return matchGuard.saveTokens(state.value, /b/).value
    },
    'expected': '¤b«1:2»¤d',
    'input': 'ab?c!d'
  },
  {
    'should': 'Should restore all tokens except when preceeded with b',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a?!]/i, input, 'xr')
      var saved = matchGuard.saveTokens(state.value, /b/)
      return matchGuard.restore(saved)
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab?c!d'
  }
]
