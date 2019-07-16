---
title: "JavaScript multiple left-hand assignment "
date: 2019-05-13
tags: ["JavaScript"]
description: "What happens when you do: 'var a=b=c=1'"
---

In JavaScript, you can assign multiple variables in the same line of code:

```js
var a = 1, b = 2
console.log(a, b) // 1 2
```

<br/>
And you can also assign several variables together:

```js
var a = b = 2
console.log(b) // 2
console.log(a) // ReferenceError: a is not defined
```

<br/>
What just happened? Assignment is right associative (pairs from right to left), so the next two lines of code are equivalent:

```js
var a = b = c = 2
var a = (window.b = (window.c = 2))
```
<br/>
The right most pair is like an assignment when you forget to put the var keyword.


You can also think about `var a = b = 3` as

```js
b = 3
var a = b
```

<br/>

- reference: [stackoverflow](https://stackoverflow.com/a/1758912/1013)