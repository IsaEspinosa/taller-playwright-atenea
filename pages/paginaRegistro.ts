import { Page, Locator } from "@playwright/test";

export class PaginaRegistro {
  readonly page: Page;
  readonly nombreInput: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.nombreInput = page.getByRole("textbox", { name: "Nombre" });
  }
}
