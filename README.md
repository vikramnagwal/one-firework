# one-firework 🧨  
_Explode once. Never again._

> 💡 A single-execution function utility — type-safe, side-effect-proof, and featherlight.


`one-firework` ensures your function **runs exactly once**, no matter how many times it’s called. Perfect for **initializations**, **expensive computations**, or **preventing repeated side effects**. All with **type safety**, **reset control**, and zero bloat. Control the way your code runs.

## ✨ Features

- ✅ **One-shot execution** – Your function, but strictly once.
- 🔒 **Type-safe & secure** – Written in TypeScript, scanned by Snyk.
- ⚡ **Blazingly fast** – Perfect match for Bun.
- 🪶 **Featherlight** – No overhead, no nonsense.
- 🧠 **Predictable control flow** – Say goodbye to accidental re-runs.
- 🔁 **Resettable** – Need another spark? Just reset.

## 🚀 Installation Guide

```sh
⚡bun add one-firework 
```
or
```bash
📦npm install one-firework   ~ 🚀 Classic launch
🐈‍yarn add one-firework      ~ 🎇 Smooth glide

```

## 🧠 Usage
```ts
import firework from 'one-firework'

function expensiveCalculation(a: number, b: number): number {
  console.log("Performing expensive calculation...");
  return a + b;
}

const onceCalculation = firework(expensiveCalculation);

onceCalculation(5, 3); // 👉 8
onceCalculation(9, 1); // 👉 8 (ignored)
onceCalculation(2, 3); // 👉 8 (still ignored)

firework.fired(onceCalculation); // 👉 3 (calls tracked)

```

### ~ with options `throwOnMaxCalls`

```ts
const runOnce = firework(expensiveCalculation, { throwOnMaxCalls: true });

runOnce(1, 2); // ✅ Executes
runOnce(3, 4); // ❌ Throws: function already called

```
## 🤓 API
### firework(func, options?)
Returns a function that invokes `func` only on the first call.

#### func

Type: `Function` - 
The function to protect from repeated execution.

#### options _(Optional)_
Type: `Object`

#####  throwOnMaxCalls

 - Type: `boolean`, 
 - Default: `false`

 - If `true`, calling more than once throws an error.

 ### firework.fired(func)

 Returns the number of times the function was called.

 > ℹ️ Note: This only works when the function is wrapped with firework.

 > ⏳ _Coming soon_: You'll be able to call .fired directly on the function (fn.fired) without needing to wrap it!

## 🌟Why one-firework?
 Sometimes, you only want the fuse to burn once — like:

 - Setting up a singleton
 - Subscribing to an event
 - Running an initialization block
 - Avoiding duplicate requests

 Let one-firework handle that — beautifully, safely, and with a little style. 🧨

### License

[MIT](https://choosealicense.com/licenses/mit/)


