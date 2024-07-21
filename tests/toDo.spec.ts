import { test, expect } from "@playwright/test";
import moment from "moment";
import { ToDoPage } from "../pages/toDoPage";
import { allure } from "allure-playwright";

test("todo items flow", async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  const firstToDoText = `TODO1 - ${moment().format("DD-MM-YYYY")}`;
  const secondToDoText = `TODO2 - ${moment().add(1, "days").format("DD-MM-YYYY")}`;

  // Add Items
  await toDoPage.goto();
  await expect(page).toHaveURL(/\/examples\/react\/dist\//);

  await toDoPage.addItem(firstToDoText);

  await expect(
    toDoPage.listItem.filter({ hasText: firstToDoText })
  ).toBeVisible();

  allure.attachment("Add item", await page.screenshot(), "image/png");

  await toDoPage.addItem(secondToDoText);

  // Check Item
  await toDoPage.listItem
    .filter({ hasText: firstToDoText })
    .getByRole("checkbox")
    .check();

  await expect(page.getByText(firstToDoText)).toHaveCSS(
    "text-decoration",
    /line-through/
  );

  allure.attachment("Check item", await page.screenshot(), "image/png");

  // Delete Item
  await toDoPage.deleteItem(secondToDoText);

  expect(
    await toDoPage.listItem
      .filter({
        hasText: secondToDoText,
      })
      .count()
  ).toBe(0);

  allure.attachment("Delete item", await page.screenshot(), "image/png");
});
