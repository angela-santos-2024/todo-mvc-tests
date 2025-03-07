import { type Locator, type Page, expect } from "../../playwright";

export class ToDoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly listItem: Locator;
  readonly checkbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInput = this.page.getByLabel("New Todo Input");
    this.listItem = this.page.getByRole("listitem");
    this.checkbox = this.page.getByRole("checkbox");
  }

  //Actions

  async goto() {
    await this.page.goto("/examples/react/dist");
  }

  async addItem(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press("Enter");
  }

  async checkItem(text: string) {
    await this.page.getByText(text).check();
  }

  async deleteItem(text: string) {
    await this.listItem
      .filter({
        hasText: text,
      })
      .hover();

    await this.listItem
      .filter({
        hasText: text,
      })
      .getByRole("button")
      .click();
  }

  //Assertions
  async expectCorrectUrl() {
    await expect(this.page).toHaveURL(/\/examples\/react\/dist\//);
  }

  async expectItemVisible(text: string) {
    await expect(
      this.listItem.filter({ hasText: text })
    ).toBeVisible();
  }

  async expectItemChecked(text: string) {
    await expect(this.page.getByText(text)).toHaveCSS(
      "text-decoration",
      /line-through/
    );
  }

  async expectItemDeleted(text: string) {
    expect(
      await this.listItem
        .filter({
          hasText: text,
        })
        .count()
    ).toBe(0);
  }
}
