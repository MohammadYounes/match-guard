'use strict'
var CHAR_TOKEN_REPLACEMENT = '\u00A4' // ¤
var CHAR_TOKEN_START = '\u00AB' // «
var CHAR_TOKEN_END = '\u00BB' // »

var PATTERN_TOKEN = CHAR_TOKEN_START + '\\d(:\\d+)?' + CHAR_TOKEN_END // «offset:index»
var PATTERN_TOKEN_WITH_NAME = '\\w*?' + CHAR_TOKEN_START + '\\d+(:\\d+)?' + CHAR_TOKEN_END // «offset:index»

var REGEX_TOKENS = new RegExp(PATTERN_TOKEN, 'ig') // «offset:index»
var REGEX_TOKENS_WITH_NAME = new RegExp(PATTERN_TOKEN_WITH_NAME, 'ig') // «offset:index»
var REGEX_TOKEN_REPLACEMENT = new RegExp(CHAR_TOKEN_REPLACEMENT, 'ig') // ¤

module.exports = {
  lastIndex: 0,
  guard: function (what, where, flags) {
    flags = flags || ''
    var state = {
      value: where,
      store: [],
      offset: this.lastIndex++,
      token: CHAR_TOKEN_START + this.lastIndex,
      indexed: flags.indexOf('x') > -1
    }
    var repeat = flags.indexOf('r') > -1
    var loop = true
    var max = state.value.length
    if (state.indexed === true) {
      while (loop && what.test(state.value)) {
        state.value = state.value.replace(what, function (m) { state.store.push(m); return state.token + ':' + state.store.length + CHAR_TOKEN_END })
        loop = repeat
        if (max-- === 0) {
          throw new Error('max iterations reached [' + (where.length) + ']. Aborting!')
        }
      }
    } else {
      while (loop && what.test(state.value)) {
        state.value = state.value.replace(what, function (m) { state.store.push(m); return state.token + CHAR_TOKEN_END })
        loop = repeat
        if (max-- === 0) {
          throw new Error('max iterations reached [' + (where.length) + ']. Aborting!')
        }
      }
    }
    return state
  },
  unguard: function (state, callback) {
    if (state.indexed === true) {
      var detokenizer = new RegExp('(\\w*?)' + state.token + ':(\\d+)' + CHAR_TOKEN_END, 'i')
      while (detokenizer.test(state.value)) {
        state.value = state.value.replace(detokenizer, function (match, name, index) {
          var value = state.store[index - 1]
          if (typeof callback === 'function') {
            return name + callback(value, name)
          }
          return name + value
        })
      }
      return state.value
    } else {
      return state.value.replace(new RegExp('(\\w*?)' + state.token + CHAR_TOKEN_END, 'ig'), function (match, name) {
        var value = state.store.shift()
        if (typeof callback === 'function') {
          return name + callback(value, name)
        }
        return name + value
      })
    }
  },
  save: function (what, where, replacement, restorer, exclude) {
    var state = {
      value: where,
      store: [],
      replacement: replacement,
      restorer: restorer
    }
    state.value = state.value.replace(what, function (c) {
      if (exclude && c.match(exclude)) {
        return c
      } else {
        state.store.push(c); return state.replacement
      }
    })
    return state
  },
  restore: function (state) {
    var index = 0
    var result = state.value.replace(state.restorer, function () {
      return state.store[index++]
    })
    state.store.length = 0
    return result
  },
  saveTokens: function (value, exclude) {
    return toString.call(exclude) === '[object RegExp]'
      ? this.save(REGEX_TOKENS_WITH_NAME, value, CHAR_TOKEN_REPLACEMENT, REGEX_TOKEN_REPLACEMENT, exclude)
      : this.save(REGEX_TOKENS, value, CHAR_TOKEN_REPLACEMENT, REGEX_TOKEN_REPLACEMENT)
  },
  restoreTokens: function (state) {
    return this.restore(state)
  }
}
