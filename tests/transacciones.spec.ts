import { test, expect } from "@playwright/test";
import { PaginaLogin } from "../pages/paginaLogin";
import { PaginaDashboard } from "../pages/paginaDashboard";
import { ModalCrearCuenta } from "../pages/modalCrearCuenta";
import { beforeEach } from "node:test";

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;

test.beforeEach(async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  modalCrearCuenta = new ModalCrearCuenta(page);
  await paginaLogin.visitarPaginaLogin();
  await page.waitForURL("http://localhost:3000/dashboard");
});

test("TC5 - Crear una cuenta", async ({ page }) => {
  await paginaLogin.logueoExitoso("vivianaisabel85@example.com", "M1r37a");
  await paginaDashboard.botonCrearCuenta();
  await modalCrearCuenta.tipoCuentaCombobox.click();
  await modalCrearCuenta.opcionDebito.click();
  await modalCrearCuenta.montoInicialInput.fill("150");
  await modalCrearCuenta.crearCuentaInput.click();
  await page.waitForTimeout(5000);
});
