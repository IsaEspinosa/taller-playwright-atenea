//importaciones de Playwright
import { Page, Locator, expect } from "@playwright/test";

//exponiendo la clase para usarla en los test
export class PaginaLogin {
  //siempre necesitaremos el page para  interactuar con la página
  readonly page: Page;

  //definimos los elementos web que contiene la página
  readonly emailInput: Locator;
  readonly contraseñaInput: Locator;
  readonly botonIniciarSesion: Locator;
  readonly linkRegistrarse: Locator;
  readonly botonCrearCuenta: Locator;
  readonly loginExitoso: string;
  readonly loginFallido: string;
  readonly cierreDeSesion: string;

  //constructor que recibe el page y define los localizadores de los elementos
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Correo electrónico" });
    this.contraseñaInput = page.getByRole("textbox", { name: "Contraseña" });
    this.botonIniciarSesion = page.getByTestId("boton-login");
    this.linkRegistrarse = page.getByTestId("link-registrarse-login");
    this.botonCrearCuenta = page.getByTestId("boton-signup-header");
    this.loginExitoso = "Inicio de sesión exitoso";
    this.loginFallido = "Invalid credentials";
    this.cierreDeSesion = "Sesión cerrada correctamente";
  }

  async visitarPaginaLogin() {
    await this.page.goto("http://localhost:3000/login");
  }

  async completarFormularioLogin(email: string, contraseña: string) {
    await this.emailInput.fill(email);
    await this.contraseñaInput.fill(contraseña);
  }

  async hacerClickEnBotonIniciarSesion() {
    await this.botonIniciarSesion.click();
  }

  async logueoExitoso(email: string, contraseña: string) {
    await this.completarFormularioLogin(email, contraseña);
    await this.hacerClickEnBotonIniciarSesion();
  }
}
