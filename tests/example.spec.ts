import { test, expect } from "@playwright/test";
import { PaginaRegistro } from "../pages/paginaRegistro";

let paginaRegistro: PaginaRegistro;

test("TC1-Registro exitoso", async ({ page }) => {
  //creamos un metódo para realizar el registro con un nuevo usuario cada vez que
  // se corra el test (con un email válido)

  paginaRegistro = new PaginaRegistro(page);
  const emailAleatorio =
    "vivianaisabel" + Math.floor(Math.random() * 1000) + "@example.com";

  //actions
  await page.goto("http://localhost:3000/signup");
  await paginaRegistro.nombreInput.fill("Isabel");
  await page.locator('[name="lastName"]').fill("Espinosa");
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill(emailAleatorio);
  await page
    .getByRole("textbox", { name: "Contraseña" })
    .fill("Isabel27801093");
  await page.getByTestId("boton-registrarse").click();
  //asertions
  await expect(page.getByText("Registro exitoso!")).toBeVisible();
});

test("TC2-Registro fallido, correo existente", async ({ page }) => {
  //creamos un metódo para realizar el registro fallido con un correo existente
  paginaRegistro = new PaginaRegistro(page);

  await page.goto("http://localhost:3000/signup");
  await paginaRegistro.nombreInput.fill("Isabel");
  await page.locator('[name="lastName"]').fill("Espinosa");
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill("vivianaisabelespinosa@gmail.com");
  await page
    .getByRole("textbox", { name: "Contraseña" })
    .fill("Isabel27801093");
  await page.getByTestId("boton-registrarse").click();
  //asertions
  await expect(page.getByText("Email already in use")).toBeVisible();
});
