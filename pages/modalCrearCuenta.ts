//importaciones de Playwright
import { Page, Locator, expect } from "@playwright/test";

//exponiendo la clase para usarla en los test
export class ModalCrearCuenta {
  readonly page: Page;
  readonly tipoCuentaCombobox: Locator;
  readonly opcionDebito: Locator;
  readonly montoInicialInput: Locator;
  readonly crearCuentaInput: Locator;

  //constructor que recibe el page y define los localizadores de los elementos
  constructor(page: Page) {
    this.page = page;
    this.tipoCuentaCombobox = page.getByRole("combobox", { name: "Tipo de cuenta *" });
    this.opcionDebito = page.getByRole("option", { name: "Débito" });
    this.montoInicialInput = page.getByRole("spinbutton", { name: "Monto inicial *" });
    this.crearCuentaInput = page.getByTestId("boton-crear-cuenta");
  }
}
