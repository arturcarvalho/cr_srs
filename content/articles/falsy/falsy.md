---
title: "JavaScript Falsy and Truthy values"
date: 2019-07-15
tags: ["JavaScript"]
description: "Learning which values are converted to false and true."
---

When you convert a value to a boolean (true or false), it can become false **(a falsy value)** or true **(a truthy value)**.

Saying **"converting a value"** and **"coercing a value"** means the same thing.

There are several ways to convert a value to a boolean. Here, you use the [Boolean function](javascript-boolean-function) to do the conversions.

There are only **6 falsy values**, the rest are truthy values. The 6 falsy values:

```js
Boolean(false) // false
Boolean("") // false, an empty string. `` and '' are also false.
Boolean(0) // false, the number zero.
Boolean(NaN) // false, not a number.
Boolean(null) // false
Boolean(undefined) // false
```

<br/>
Let's see some examples that may seem to be false, but are true.

```js
Boolean(new Boolean(false))
// true, new always returns true.

Boolean("false")
// true, only empty string is false.

Boolean({})
// true, empty object is not one of the 6 falsy values.

Boolean([])
// true, empty array is not one of the 6 falsy values.

Boolean(-1)
// true, -1 is not 0, so it returns true.
```

- reference: [MDN Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
