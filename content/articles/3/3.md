---
title: "JavaScript Boolean function"
date: 2019-05-13
tags: ["JavaScript"]
description: "Converting stuff with the Boolean function"
---

You can use the function Boolean to convert a value to a boolean (true or false).
Don't confuse it with the "new Boolean". If you use Boolean as a constructor function, it returns true.

```js
var x = Boolean(false) // false
if (x) console.log("hey") // it doesn't print anything

var y = new Boolean(false) // true
if (y) console.log("hey") // it prints hey
```

<br/>

Let's see all the falsy values:

```js
Boolean("") // false
Boolean(0) // false
Boolean(-0) // false
Boolean(null) // false
Boolean(undefined) // false
Boolean(NaN) // false
Boolean(false) // false
```

<br/>
And the next ones are values that are true, but may seem that they should be false.

```js
Boolean(new Boolean(false)) // true
Boolean("false") // true
Boolean({}) // true
Boolean([]) // true
Boolean(-1) // true
```

<br/>

You can also use the [double not (!!)](javascript-double-negation-double-bang) to to do equivalent conversions.

- Should you learn both? Yes, they can be seen in many codebases.
- Which one is faster? In recent browsers, they should be similar ([jsperf](https://jsperf.com/double-exclamation-mark-vs-boolean)).
- Which one to use? It seems to be personal preference. Some people find !! more obscure, some find it more succint.

Saying "coercing a value" and "converting a value" mean the same thing.

Reference: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
