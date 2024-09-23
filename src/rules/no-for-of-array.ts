import { ESLintUtils } from "@typescript-eslint/utils";

export interface noForOfArrayRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}
export const createRule = ESLintUtils.RuleCreator<noForOfArrayRuleDocs>(
  () => "https://www.npmjs.com/package/eslint-plugin-not-for-of-array"
);

export const rule = createRule({
  name: "no-for-of-array",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Do not use for...of loop with array, use for loop instead, because for loop is faster than for...of loop",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      noForOfArray:
        "Do not use for...of loop with array, use for loop instead, because for loop is faster than for...of loop",
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const typeChecker = services.program.getTypeChecker();
    return {
      ForOfStatement(node) {
        const type = services.getTypeAtLocation(node.right);

        // Object.keys, Object.values, Object.entries, Set, Map are not array
        if (typeChecker.isArrayType(type)) {
          context.report({
            node,
            messageId: "noForOfArray",
          });
        }
      },
    };
  },
});
