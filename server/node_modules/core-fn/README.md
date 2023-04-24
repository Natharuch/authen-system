<!-- <p align="center">
  <img alt="logo image" src="" />
  <h1 align="center">core-fn</h1>
</p> -->

<p align="center">
A collection of built-in object method and property as currying function
</p>

<div align="center">

[![test](https://github.com/TomokiMiyauci/core-fn/actions/workflows/test.yml/badge.svg)](https://github.com/TomokiMiyauci/core-fn/actions/workflows/test.yml)
[![GitHub release](https://img.shields.io/github/release/TomokiMiyauci/core-fn.svg)](https://github.com/TomokiMiyauci/core-fn/releases)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/core_fn)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/core_fn)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/core_fn/mod.ts)
[![deno version](https://img.shields.io/badge/deno-^1.6.0-lightgrey?logo=deno)](https://github.com/denoland/deno)
![node support version](https://img.shields.io/badge/node-%5E6.17.0-yellow)

![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/TomokiMiyauci/core-fn)
[![dependencies Status](https://status.david-dm.org/gh/TomokiMiyauci/core-fn.svg)](https://david-dm.org/TomokiMiyauci/core-fn)
[![codecov](https://codecov.io/gh/TomokiMiyauci/core-fn/branch/main/graph/badge.svg?token=SPAi5Pv2wd)](https://codecov.io/gh/TomokiMiyauci/core-fn)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f43b1c317e11445399d85ce6efc06504)](https://www.codacy.com/gh/TomokiMiyauci/core-fn/dashboard?utm_source=github.com&utm_medium=referral&utm_content=TomokiMiyauci/core-fn&utm_campaign=Badge_Grade)
![npm type definitions](https://img.shields.io/npm/types/core-fn)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat)
![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B26231%2Fgithub.com%2FTomokiMiyauci%2Fcore-fn.svg?type=small)](https://app.fossa.com/projects/custom%2B26231%2Fgithub.com%2FTomokiMiyauci%2Fcore-fn?ref=badge_small)

</div>

---

The methods and properties of the build-in object are made independent as
functions. All functions are currying and have no side effects such as
exceptions.

## :sparkles: Features

- :zap: Multi runtime support (`Deno`, `Node.js` and Browsers)
- :books: Pure TypeScript and provides type definition
- :earth_americas: Universal module, providing `ES modules` and `Commonjs`
- :package: Optimized, super slim size
- :page_facing_up: TSDoc-style comments

### Package name

`core-fn` ([deno.land](https://deno.land/x/core_fn),
[nest.land](https://nest.land/package/core_fn),
[npm](https://www.npmjs.com/package/core-fn))

## :question: Why

This project provides all build-in object methods and properties as no
side-effect currying functions.

The differences with [core-js-pure](https://github.com/zloirock/core-js#readme)
are as follows:

- The goal of this project is not to become polifill. It is to provide small
  basic functions for functional programming.

- All functions are currying.

- All functions have no side effects, do not raise exceptions, and return
  values.

This allows you to use the basic functions for functional programming without
having to define them.

For example, if you are going to use `String#replace` to convert a string, you
can often make it a function to increase independence and testability.

```ts
const fallback = (val: string) => val.replace("https", "http");
```

A more generalized version of this function would look like this:

```ts
const replace = (from: string, to: string) =>
  (val: string) => val.replace(from, to);
const fallback = replace("https", "http");
```

This makes a generic replace function that can be used for other strings.

```ts
const shorten = replace("typescript", "ts");
```

However, the `replace` function is not easy to use. The `replace` function
always requires two arguments.

If you want to convert the string `typescript` to `javascript` and `ts`, you
will have to make a duplicate declaration.

```ts
const shorten = replace(''typescript'', 'ts'')
const toJavaScript = replace('typescript', 'javascript')
```

This can be solved by currying.

```ts
// currying replace function
const fromTypescript = curryingReplace("typescript");
const shorten = fromTypescript("ts");
const toJavaScript = fromTypescript("javascript");

shorten("typescript is great"); // 'ts is great'
toJavaScript("typescript"); // 'javascript'
```

It's hard to make currying and the Type system coexist, but this project solves
that problem. All currently supported functions are [here](#memo-api).

Also, all pure functions can be synthesized to create a concise pipeline.

The following example composes the String object methods of `trim`, `replace`
and `toUpperCase` to create a new function.

```ts
const title = pipe(trim, replace("typescript", "ts"), toUpperCase);

title(" typescript is great  "); // 'TS IS GREAT'
```

Since this project targets all build-in objects, it is recommended to use
[pipe](https://github.com/TomokiMiyauci/fonction) for composite functions.

## :dizzy: Usage

`core-fn` provides multi platform modules.

### 🦕 Deno

#### [deno.land](https://deno.land/x/core-fn)

```ts
import { replace } from "https://deno.land/x/core-fn/mod.ts";

replace("hello")("hi", "hello Tom"); // 'hi Tom'
```

#### [nest.land](https://nest.land/package/core-fn)

```ts
import { replace } from "https://x.nest.land/core-fn/mod.ts";

replace("hello")("hi", "hello Tom"); // 'hi Tom'
```

### :package: Node.js

#### Install

```bash
npm i core-fn
or
yarn add core-fn
```

#### ES modules

```ts
import { replace } from "core-fn";

replace("hello")("hi", "hello Tom"); // 'hi Tom'
```

#### Commonjs

```ts
const { replace } = require("core-fn");

replace("hello")("hi", "hello Tom"); // 'hi Tom'
```

### :globe_with_meridians: Browser

The module that bundles the dependencies is obtained from
[skypack](https://www.skypack.dev/view/core-fn).

```html
<script type="module">
  import { replace } from "https://cdn.skypack.dev/core-fn";
  console.log(replace('hello')('hi', 'hello Tom'); // 'hi Tom'
</script>
```

## :memo: API

### String

`charAt`, `endsWith`, `match`, `repeat`, `replace`, `startsWith`, `toLowerCase`,
`toUpperCase`, `trimEnd`, `trimLeft`, `trimRight`, `trimStart`, `trim`

### Symbol

`description`

### RegExp

`dotAll`, `exec`, `flags`, `global`, `ignoreCase`, `lastIndex`, `multiline`,
`source`, `sticky`, `test`, `unicode`

### Common(Methods or properties of multiple types)

`includes`, `length`, `map`, `slice`

## :green_heart: Supports

> ie is no longer supported to reduce bundle size.

The TypeScript version must be `4.1.0` or higher.

This project provides `ES modules` and `Commonjs`.

If you have an opinion about what to support, you can open an
[issue](https://github.com/TomokiMiyauci/core-fn/issues) to discuss it.

The `browserslist` has the following settings.

```text
defaults
last 8 version
not IE <= 11
not ie_mob <= 11
node 6
```

| <img width="30px" height="30px" alt="Deno" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/deno.svg"></br>Deno | <img width="24px" height="24px" alt="Node.js" src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1620998361/logos/nodejs.svg"></br>Node.js | <img width="24px" height="24px" alt="IE / Edge" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png"></br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /></br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /></br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /></br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /></br>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /></br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `^1.6.0`                                                                                                                                | `^6.17.0`                                                                                                                                       | `^83`                                                                                                                                                | `^78`                                                                                                                                                         | `^83`                                                                                                                                                     | `^11`                                                                                                                                                     | `^12.0`                                                                                                                                                                   | `^7.2`                                                                                                                                                                          | `^68`                                                                                                                                                 |

## :handshake: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues](https://github.com/TomokiMiyauci/core-fn/issues).

[Contributing guide](./.github/CONTRIBUTING.md)

## :seedling: Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/tomoki_miyauci">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## :bulb: License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B26231%2Fgithub.com%2FTomokiMiyauci%2Fcore-fn.svg?type=large)](https://app.fossa.com/projects/custom%2B26231%2Fgithub.com%2FTomokiMiyauci%2Fcore-fn?ref=badge_large)
