import { test, expect } from "@playwright/test";
import { PaginaLogin } from "../pages/paginaLogin";
import { PaginaDashboard } from "../pages/paginaDashboard";

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;

test("TC1-Login exitoso e inicio de Dashboard", async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("vivianaisabel85@example.com", "M1r37a");
  await expect(page.getByText(paginaLogin.loginExitoso)).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
  await expect(paginaDashboard.titulo).toBeVisible();
});

test("TC2-Intento de login con credenciales inválidas", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.completarFormularioLogin("vivianaisabel85@example.com", "wrongpassword");
  await paginaLogin.hacerClickEnBotonIniciarSesion();
  await expect(page).toHaveURL("http://localhost:3000/login");
  await expect(page.getByText(paginaLogin.loginFallido)).toBeVisible();
});

test("TC3-Intento de login con campos vacíos", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.hacerClickEnBotonIniciarSesion();
  await page.waitForTimeout(5000);
  //await expect(page).toHaveURL("http://localhost:3000/login");
});

test("TC4-Intento de Login con Email sin Contraseña", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.completarFormularioLogin("vivianaisabel85@example.com", "");
  await paginaLogin.hacerClickEnBotonIniciarSesion();
  await page.waitForTimeout(5000);
  //await expect(page).toHaveURL("http://localhost:3000/login");
});

test("TC5-Intento de Login con formato de email incorrecto", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.completarFormularioLogin("testinvalido", "125986");
  await paginaLogin.hacerClickEnBotonIniciarSesion();
  await page.waitForTimeout(5000);
  //await expect(page).toHaveURL("http://localhost:3000/login");
});

test("TC6-Verificación del enlace de registro", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.linkRegistrarse.click();
  await expect(page).toHaveURL("http://localhost:3000/signup");
});

test("TC7-Cierre de sesión y protección de rutas", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("vivianaisabel85@example.com", "M1r37a");
  await expect(page.getByText(paginaLogin.loginExitoso)).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
  await paginaDashboard.logoutInput.click();
  await expect(page).toHaveURL("http://localhost:3000/login");
  await paginaDashboard.visitarPaginaDashboard();
  await expect(page).toHaveURL("http://localhost:3000/login");
});
