import { ESLintUtils } from "@typescript-eslint/utils";
import * as ts from "typescript";

export interface PreferForOverArrayRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}
export const createRule = ESLintUtils.RuleCreator<PreferForOverArrayRuleDocs>(
  () => "https://www.npmjs.com/package/eslint-prefer-for-over-array"
);

export const rule = createRule({
  name: "prefer-for-over-array",
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer for loop over array, rather than for...of loop",
    },
    messages: {
      preferForOverArray:
        "Prefer for loop over array, rather than for...of loop",
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
            messageId: "preferForOverArray",
          });
        }
      },
    };
  },
});
