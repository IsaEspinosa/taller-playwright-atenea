import { test, expect } from "@playwright/test";
import { PaginaLogin } from "../pages/paginaLogin";

let paginaLogin: PaginaLogin;

test("TC1-Login exitoso", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);

  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("vivianaisabel85@example.com", "M1r37a");
});
