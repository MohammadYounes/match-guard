var matchGuard = require('../../lib/match-guard.js')

module.exports = [
  {
    'should': 'Should guard first occurence',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/[a1!]/i, input, 'x').value
    },
    'expected': '«1:1»b1c!d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should unguard first occurence',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/i, input, 'x')
      return matchGuard.unguard(state)
    },
    'expected': 'ab1c!d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should save guarded token',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/i, input, 'x')
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤b1c!d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should restore saved token',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/i, input, 'x')
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1:1»b1c!d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should guard all occurences',
    'run': function (input) {
      matchGuard.lastIndex = 0
      return matchGuard.guard(/[a1!]/ig, input, 'x').value
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should unguard all occurence',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/ig, input, 'x')
      return matchGuard.unguard(state)
    },
    'expected': 'ab1c!d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should save guarded tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/ig, input, 'x')
      return matchGuard.saveTokens(state.value).value
    },
    'expected': '¤b¤c¤d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should save guarded tokens except when preceeded with "b"',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/ig, input, 'x')
      return matchGuard.saveTokens(state.value, /b/).value
    },
    'expected': '¤b«1:2»¤d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should restore saved tokens except when preceeded with "b"',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/ig, input, 'x')
      var saved = matchGuard.saveTokens(state.value, /b/)
      return matchGuard.restore(saved)
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab1c!d'
  },
  {
    'should': 'Should restore saved tokens',
    'run': function (input) {
      matchGuard.lastIndex = 0
      var state = matchGuard.guard(/[a1!]/ig, input, 'x')
      var saved = matchGuard.saveTokens(state.value)
      return matchGuard.restore(saved)
    },
    'expected': '«1:1»b«1:2»c«1:3»d',
    'input': 'ab1c!d'
  }
]
