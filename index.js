'use strict'

var Struct = require('observ-struct')
var Observ = require('observ')
var assign = require('xtend/mutable')
var valueError = require('value-error')
var Event = require('weakmap-event')
var createStore = require('weakmap-shim/create-store')

var store = createStore()

module.exports = Result

function Result (data) {
  data = data || {}

  var state = Struct({
    pending: Observ(data.pending || false),
    error: Observ(data.error || null)
  })

  assign(store(state), {callbacks: []})

  return state
}

Result.load = function load (state, fn) {
  if (!state.pending()) state.pending.set(true)
  fn(createHandler(state))
}

var DataEvent = Event()
var ErrorEvent = Event()

Result.onData = DataEvent.listen
Result.onError = ErrorEvent.listen

function createHandler (state) {
  store(state).callbacks.push(onResult)

  return onResult

  function onResult (err, data) {
    var callbacks = store(state).callbacks
    var index = callbacks.indexOf(onResult)
    var length = callbacks.length

    if (!length || length - 1 !== index) return

    store(state).callbacks = []
    state.pending.set(false)

    if (err) {
      state.error.set(valueError(err))
      return ErrorEvent.broadcast(state, err)
    }

    DataEvent.broadcast(state, data)
  }
}
