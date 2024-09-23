import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";
import { rule } from "./no-for-of-array.js";
import * as vitest from "vitest";
import { join } from "path";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
        defaultProject: "tsconfig.json",
      },
      tsconfigRootDir: join(__dirname, "../.."),
    },
  },
});

ruleTester.run("prefer-for-over-array", rule, {
  valid: [
    `
    const arr = [1, 2, 3];
    for (let i = 0; i < arr.length; i++) {}
    `,
    `
    const obj = { a: 1, b: 2, c: 3 };
    for (const key in obj) {}
    `,
    `
    for (const value of new Set([1, 2, 3])) {}
    `,
    `
    for (const [key, value] of new Map([[1, 2], [3, 4]])) {}
    `,
  ],
  invalid: [
    {
      code: `
      const arr = [1, 2, 3];
      for (const item of arr) {}
      for (const item of [1, 2, 3]) {}
      for (const item of Object.keys({ a: 1, b: 2, c: 3 })) {}
      for (const item of Object.values({ a: 1, b: 2, c: 3 })) {}
      for (const item of Object.entries({ a: 1, b: 2, c: 3 })) {}
      `,
      errors: [
        { messageId: "noForOfArray", line: 3, column: 7 },
        { messageId: "noForOfArray", line: 4, column: 7 },
        { messageId: "noForOfArray", line: 5, column: 7 },
        { messageId: "noForOfArray", line: 6, column: 7 },
        { messageId: "noForOfArray", line: 7, column: 7 },
      ],
    },
  ],
});
