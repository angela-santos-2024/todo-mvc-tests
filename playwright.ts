/* eslint-disable @typescript-eslint/no-explicit-any */
import { test as base, TestDetails } from "@playwright/test";
import { ToDoSteps } from "./src/steps/toDoSteps";
import { argsToString, toPhrase } from "playwright-components";

//FIXTURES -> https://playwright.dev/docs/test-fixtures#combine-custom-fixtures-from-multiple-modules
type Steps = {
    toDoSteps: ToDoSteps;
};

export * from "@playwright/test";

export const test = base.extend<Steps>({
    toDoSteps: async ({ page }, use) => {
        use(new ToDoSteps(page));
    },
});

//DECORATORS -> https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
export function Step(
    originalMethod: (...args: any) => Promise<any>,
    context: ClassMethodDecoratorContext,
) {
    return function replacement(...args: any): Promise<any> {
        const testName = `${toPhrase(context.name as string)} - [${argsToString(args, 2)}]`;
        return test.step(testName, async() => {
            return await originalMethod.call(this, ...args);
        });
    }
}

export function jira(issue: string): TestDetails {
    return {
        annotation: { 
            type: "test",
            description: `https://jira.com/${issue}`,
        },
        tag: `@${issue}`,
    };

}