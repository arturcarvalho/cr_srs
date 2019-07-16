---
title: "JavaScript double negation (double bang)"
date: 2019-05-13
tags: ["JavaScript"]
description: "Bang bang, you're a boolean!"
---

You might have seen code like this:

```js
var x = !!""
console.log(x) // false
```

The double bang (`!!`) looks like a [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators), but it's not.

It's the logical **not (!)** used twice. The `!!` converts a value to a boolean.

Look at how it happens in the steps below:

```js
// Executing !!"" is similar to these 3 steps:
// 1. !!false ("" is converted to false)
// 2. !true
// 3. false
console.log(!!"") // false
```

<br/>

There are several values that are falsy. Learn more in [Falsy and Truthy values](/articles/javascript-falsy-and-truthy-values).
You can also use a [Boolean function](javascript-boolean-function) to do equivalent conversions.

**Should you learn Boolean and !!?**<br/>
Yes, they can be seen in many codebases.

**Which one is faster? Boolean or !!?**<br/>
You might think on optimizing this and check [jsperf](https://jsperf.com/double-exclamation-mark-vs-boolean).
This is microbenchmarking and usually it's not good. Check this [great talk](https://www.youtube.com/watch?v=65-RbBwZQdU) to understand why.

**Which one should you use?**<br/>
It seems to be personal preference. Some people find !! more obscure, some find it more succint.

- reference: [stackoverflow](https://stackoverflow.com/a/1406618/1013)
