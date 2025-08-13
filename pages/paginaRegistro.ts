//importaciones de Playwright
import { Page, Locator } from "@playwright/test";

//exponiendo la clase para usarla en los test
export class PaginaRegistro {
  //siempre necesitaremos el page para  interactuar con la página
  readonly page: Page;

  //definimos los elementos web que contiene la página
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailInput: Locator;
  readonly contraseñaInput: Locator;
  readonly botonRegistrarse: Locator;
  readonly botonIniciarSesion: Locator;

  //variables de textos
  readonly mensajeExitoso: string;
  readonly mensajeEmailRegistrado: string;

  //constructor que recibe el page y define los localizadores de los elementos
  constructor(page: Page) {
    this.page = page;
    this.nombreInput = page.getByRole("textbox", { name: "Nombre" });
    this.apellidoInput = page.locator('[name="lastName"]');
    this.emailInput = page.getByRole("textbox", { name: "Correo electrónico" });
    this.contraseñaInput = page.getByRole("textbox", { name: "Contraseña" });
    this.botonRegistrarse = page.getByTestId("boton-registrarse");
    this.botonIniciarSesion = page.getByTestId("boton-iniciar-sesion");
    this.mensajeExitoso = "Registro exitoso!";
    this.mensajeEmailRegistrado = "Email already in use";
  }

  async visitarPaginaRegistro() {
    await this.page.goto("http://localhost:3000/signup");
  }

  async completarFormularioRegistro(nombre: string, apellido: string, email: string, contraseña: string) {
    await this.nombreInput.fill(nombre);
    await this.apellidoInput.fill(apellido);
    await this.emailInput.fill(email);
    await this.contraseñaInput.fill(contraseña);
  }

  async hacerClickEnBotonRegistro() {
    await this.botonRegistrarse.click();
  }

  async registrarUsuario(nombre: string, apellido: string, email: string, contraseña: string) {
    await this.completarFormularioRegistro(nombre, apellido, email, contraseña);
    await this.hacerClickEnBotonRegistro();
  }
}
