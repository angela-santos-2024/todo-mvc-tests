import { jira, test } from "../playwright.ts";
import moment from "moment";


test.describe("ToDo List", jira('QA-1666'), () => {
  test.beforeEach(async ({toDoSteps}) => {
    await toDoSteps.navigateToUrl();
  });

  test("add item to todo list", async ({toDoSteps}) => {
    const firstToDoText = `TODO1 - ${moment().format("DD-MM-YYYY")}`;

    await toDoSteps.addItem(firstToDoText);
    await toDoSteps.expectItemToBeVisible(firstToDoText);
  });

  test("check item in todo list", async ({toDoSteps}) => {
    const firstToDoText = `TODO1 - ${moment().format("DD-MM-YYYY")}`;

    await toDoSteps.addItem(firstToDoText);
    await toDoSteps.checkItem(firstToDoText);
    await toDoSteps.expectItemToBeChecked(firstToDoText);
  });

  test("delete item from todo list", async ({toDoSteps}) => {
    const firstToDoText = `TODO1 - ${moment().format("DD-MM-YYYY")}`;

    await toDoSteps.addItem(firstToDoText);
    await toDoSteps.deleteItem(firstToDoText);
    await toDoSteps.expectItemToBeDeleted(firstToDoText);
  });
});