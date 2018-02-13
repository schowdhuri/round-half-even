# Round Half to Even

A utility for tie-breaking rounding, also called Banker's Rounding or Commercial Rounding.
Read more: https://en.wikipedia.org/wiki/Rounding#Round_half_to_even

## Demo
https://rawgit.com/schowdhuri/round-half-even/master/demo/index.html

## Installation

Using npm:

```
npm install --save round-half-even
```

Or yarn:

```
yarn add round-half-even
```
## Usage

```js
roundHalfEven(floatingPointValue, numberOfDecimals)
```

### Node.js
```js
import roundHalfEven from "round-half-even";
roundHalfEven(1.435, 2); // returns 1.44
```

### Within the browser:

```html
<script src="https://unpkg.com/round-half-even"></script>
<script>
  roundHalfEven(1.435, 2); // returns 1.44
</script>
```

## Development
Make changes to `app/index.js`. Generate the browser-ready package:

```
npm run build
```
or
```
yarn build
```

## [MIT Licensed](LICENSE)
