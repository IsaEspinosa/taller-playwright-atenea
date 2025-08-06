import { test, expect } from "@playwright/test";
import { PaginaRegistro } from "../pages/paginaRegistro";

let paginaRegistro: PaginaRegistro;

test("TC1-Registro exitoso", async ({ page }) => {
  //creamos un metódo para realizar el registro con un nuevo usuario cada vez que
  // se corra el test (con un email válido)

  paginaRegistro = new PaginaRegistro(page);
  const emailAleatorio = "vivianaisabel" + Math.floor(Math.random() * 1000) + "@example.com";

  //actions
  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Mireya", "Peña", emailAleatorio, "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeExitoso)).toBeVisible();
});

test("TC2-Registro fallido, correo existente", async ({ page }) => {
  //creamos un metódo para realizar el registro fallido con un correo existente
  paginaRegistro = new PaginaRegistro(page);

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Isabel", "Espinosa", "vivianaisabelespinosa@gmail.com", "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeEmailRegistrado)).toBeVisible();
});

test("TC3 - Verificar redireccionamiento a login postregistro", async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const emailAleatorio = "vivianaisabel" + Math.floor(Math.random() * 1000) + "@example.com";

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario("Mireya", "Peña", emailAleatorio, "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeExitoso)).toBeVisible();
  await page.waitForURL("http://localhost:3000/signup");
  await page.waitForTimeout(5000);
});
