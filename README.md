# eslint-plugin-no-for-of-array

This ESLint plugin provides a rule to disallow the use of `for...of` loops on arrays.

If you use `for...of` loops on arrays, it will be slower than using `for` loops or `Array.prototype.forEach()`.
This is because `for...of` loops are implemented using iterators, which are slower than using array indices.

It detects `for...of` loops on arrays by Typescript type checking. So, you have to use Typescript to use this rule.

## Installation

```bash
npm install -D eslint-plugin-no-for-of-array
yarn add -D eslint-plugin-no-for-of-array
pnpm add -D eslint-plugin-no-for-of-array
```

## Configuration

Add `no-for-of-array` to the plugins section of your ESLint configuration file.

```javascript
import noForOfArrayPlugin from "eslint-plugin-no-for-of-array";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    plugins: {
      "no-for-of-array": noForOfArrayPlugin,
    },
    rules: {
      "no-for-of-array/no-for-of-array": "error",
    },
  },
];
```

## Example

```typescript
const arr = [1, 2, 3, 4, 5];

for (const elem of arr) {
  // ✅ This will be detected by the rule
  console.log(elem);
}

const arr2: number[] | string[] = [1, 2, 3, 4, 5];

for (const elem of arr2) {
  // ✅ This will be detected by the rule
  console.log(elem);
}

const arr3: any = [1, 2, 3, 4, 5];

for (const elem of arr3) {
  // ❌ This will not be detected by the rule
  console.log(elem);
}

const arr4: number[] | Record<string, any> = [1, 2, 3, 4, 5];

for (const elem of arr4) {
  // ❌ This will not be detected by the rule
  console.log(elem);
}
```

It can detect `for...of` loops on arrays only if the type of variable is inferred as only an array type.
