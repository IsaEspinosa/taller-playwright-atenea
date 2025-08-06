//importaciones de Playwright
import { Page, Locator, expect } from "@playwright/test";

//exponiendo la clase para usarla en los test
export class PaginaDashboard {
  //siempre necesitaremos el page para  interactuar con la página
  readonly page: Page;

  //definimos los elementos web que contiene la página
  readonly botonAgregarCuenta: Locator;
  readonly titulo: Locator;
  readonly logoutInput: Locator;
  readonly cuentaCreada: string;

  //constructor que recibe el page y define los localizadores de los elementos
  constructor(page: Page) {
    this.page = page;
    this.botonAgregarCuenta = page.getByTestId("tarjeta-agregar-cuenta");
    this.titulo = page.getByTestId("titulo-dashboard");
    this.logoutInput = page.getByTestId("boton-logout");
  }

  async visitarPaginaDashboard() {
    await this.page.goto("http://localhost:3000/dashboard");
  }

  async botonCrearCuenta() {
    await this.botonAgregarCuenta.click();
  }
}
