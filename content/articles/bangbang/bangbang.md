---
title: "JavaScript double negation (double bang)"
date: 2019-05-13
tags: ["JavaScript"]
description: "Bang bang, you're a boolean!"
---

You might have seen some code like this:

```js
var x = !!""
console.log(x) // false
```

This double bang (`!!`) looks like a [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators), but it's not.

It's the logical **not (!)** used twice. Using it twice seems useless, because negating something twice should result in the same.

But negating something converts it to **true** or **false**. So if **you negate twice** you will convert a value to true or false. If something is already **true** or **false** there's no need to convert.

```js
// Executing !!"" is like 3 steps:
// 1. !!false ("" is converted to false)
// 2. !true
// 3. false
console.log(!!"") // false
```

<br/>
There are several values that are falsy. Falsy means when they are converted, they become true or false.

Let's see all the falsy values:

```js
!!"" // false
!!0 // false
!!-0 // false
!!null // false
!!undefined // false
!!Boolean(false) // false
!!NaN // false
!!false // false
```

<br/>
And the next ones are values that are true, but may seem that they should be false.

```js
!!new Boolean(false) // true (function !== constructor)
!!"false" // true
!!" " // true
!!{} // true
!![] // true
!!-1 // true
```

<br/>

You can also use a [Boolean function](javascript-boolean-function) to to do equivalent conversions.

- Should you learn both? Yes, they can be seen in many codebases.
- Which one is faster? In recent browsers, they should be similar ([jsperf](https://jsperf.com/double-exclamation-mark-vs-boolean)).
- Which one to use? It seems to be personal preference. Some people find !! more obscure, some find it more succint.

Saying "coercing a value" and "converting a value" mean the same thing.

Reference: [stackoverflow](https://stackoverflow.com/a/1406618/1013)