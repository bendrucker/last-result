'use strict'

var test = require('tape')
var Result = require('./')

test('single load', function (t) {
  t.plan(3)

  var state = Result()

  Result.load(state, function (callback) {
    process.nextTick(function () {
      callback(null, {foo: 'bar'})
    })
  })

  t.ok(state.pending())

  Result.onData(state, function (data) {
    t.deepEqual(data, {foo: 'bar'})
  })

  process.nextTick(function () {
    t.notOk(state.pending())
  })
})

test('multiple load', function (t) {
  t.plan(3)

  var state = Result()

  Result.load(state, function (callback) {
    setTimeout(function () {
      callback(null, {foo: 'bar'})
    }, 10)
  })

  Result.load(state, function (callback) {
    setTimeout(function () {
      callback(null, {bar: 'baz'})
    }, 20)
  })

  t.ok(state.pending())

  Result.onData(state, function (data) {
    t.deepEqual(data, {bar: 'baz'})
    t.notOk(state.pending())
  })
})
