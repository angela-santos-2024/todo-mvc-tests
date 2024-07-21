import { type Locator, type Page } from "@playwright/test";

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

  async goto() {
    await this.page.goto("/examples/react/dist");
  }

  async addItem(text: string) {
    await this.todoInput.fill(text);
    await this.todoInput.press("Enter");
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
}
