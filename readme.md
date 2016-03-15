# last-result [![Build Status](https://travis-ci.org/bendrucker/last-result.svg?branch=master)](https://travis-ci.org/bendrucker/last-result)

> Create an evented async interface that emits the last result from a series of calls


## Install

```
$ npm install --save last-result
```


## Usage

```js
var Result = require('last-result')
var result = Result()

result.pending()
//=> false

result.error()
//=> null

Result.load(result, function (callback) {
  //=> result.pending() === true
  load(callback)
})

function load (callback) {
  //=> load data from server
  //=> call callback w/ err, data
}

Result.onData(result, console.log)
//=> data

Result.onError(result, console.log)
//=> null / Error
```

## API

#### `Result([data])` -> `function`

Returns an observable result state.

##### data

Type: `object`
Default: `{pending: false, error: null}`

The initial result state.

#### `Result.load(state, fn)` -> `undefined`

##### state

*Required*  
Type: `function`

A result state observable.

##### fn

*Required*  
Type: `function`  
Arguments: `callback`

A function to call to trigger load. The function will receive a callback that will update the result state and trigger events based on the result.

#### `Result.onData(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A result state observable.

##### listener

*Required*  
Type: `function`

A function to be called with the result data passed back from the function provided to `Result.load`.

#### `Result.onError(state, listener)` -> `function`

Returns a function that removes the event listener.

##### state

*Required*  
Type: `function`

A result state observable.

##### listener

*Required*  
Type: `function`

A function to be called with an error passed back from the function provided to `Result.load`.


## License

MIT © [Ben Drucker](http://bendrucker.me)
