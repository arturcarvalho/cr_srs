---
title: "JavaScript Boolean function"
date: 2019-05-13
tags: ["JavaScript"]
description: "Converting stuff with the Boolean function"
---

You can use the `Boolean` function to convert a value to a boolean (true or false).
Don't confuse it with the `new Boolean`. If you use Boolean as a constructor function, it returns true.

```js
var x = Boolean(false) // false
if (x) console.log("hey") // it doesn't print.

var y = new Boolean(false) // A Boolean object.
if (y) console.log("hey") // it prints hey.
```

<br/>

There are several values that are falsy. Learn more in [Falsy and Truthy values](/articles/javascript-falsy-and-truthy-values).

You can also use the [double not (!!)](javascript-double-negation-double-bang) to do equivalent conversions.

- reference: [MDN Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).
