import { ToDoPage } from "../pages/toDoPage";
import { Step, Page} from "../../playwright";

export class ToDoSteps {

    readonly toDoPage: ToDoPage;

    constructor(page: Page) {
        this.toDoPage = new ToDoPage(page);
    }

    @Step
    async navigateToUrl() {
        await this.toDoPage.goto();
        await this.toDoPage.expectCorrectUrl();
    }

    @Step
    async addItem(text: string) {
        await this.toDoPage.addItem(text);
    }

    @Step
    async expectItemToBeVisible(text: string) {
        await this.toDoPage.expectItemVisible(text);
    }

    @Step
    async checkItem(text: string) {
        await this.toDoPage.checkItem(text);
    }

    @Step
    async expectItemToBeChecked(text: string) {
        await this.toDoPage.expectItemChecked(text);
    }

    @Step
    async deleteItem(text: string) {
        await this.toDoPage.deleteItem(text);
    }

    @Step
    async expectItemToBeDeleted(text: string) {
        await this.toDoPage.expectItemDeleted(text);
    }
}
