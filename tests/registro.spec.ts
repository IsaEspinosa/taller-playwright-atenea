import { test, expect, request } from "@playwright/test";
import { PaginaRegistro } from "../pages/paginaRegistro";
import TestData from "../data/testData.json";

let paginaRegistro: PaginaRegistro;

// hook -se ejecuta antes de cada prueba
test.beforeEach(async ({ page }) => {
  /* usos comunes son:

    Navegar a una página inicial del feature
    Inicializar page objects
    Autenticación de usuario
    Limpiar el local storage y caché
*/

  paginaRegistro = new PaginaRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();
});

test("TC1-Registro exitoso", async ({ page }) => {
  //creamos un metódo para realizar el registro con un nuevo usuario cada vez que
  // se corra el test (con un email válido)
  const emailAleatorio = "vivianaisabel" + Math.floor(Math.random() * 1000) + "@example.com";

  //actions
  await paginaRegistro.registrarUsuario("Mireya", "Peña", emailAleatorio, "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeExitoso)).toBeVisible();
});

test("TC2-Registro fallido, correo existente", async ({ page }) => {
  //creamos un metódo para realizar el registro fallido con un correo existente

  await paginaRegistro.registrarUsuario("Isabel", "Espinosa", "vivianaisabelespinosa@gmail.com", "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeEmailRegistrado)).toBeVisible();
});

test("TC3 - Verificar redireccionamiento a login postregistro", async ({ page }) => {
  const emailAleatorio = "vivianaisabel" + Math.floor(Math.random() * 1000) + "@example.com";

  await paginaRegistro.registrarUsuario("Mireya", "Peña", emailAleatorio, "M1r37a");
  //asertions
  await expect(page.getByText(paginaRegistro.mensajeExitoso)).toBeVisible();
  await page.waitForURL("http://localhost:3000/signup");
  //await page.waitForTimeout(5000);
});

test("TC6 -Verificar crear usuario desde el API", async ({ page, request }) => {
  // hacemos la petición
  const email = TestData.usuarioValido.email.split("@")[0] + Math.floor(Math.random() * 1000) + "@" + TestData.usuarioValido.email.split("@")[1];
  const response = await request.post("http://localhost:6007/api/auth/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: TestData.usuarioValido.nombre,
      lastName: TestData.usuarioValido.apellido,
      email: email,
      password: TestData.usuarioValido.contrasena,
    },
  });

  //guardamos la respuesta y validamos su contenido
  const responseBody = await response.json();
  expect(response.status()).toBe(201);

  expect(responseBody).toHaveProperty("token");
  expect(typeof responseBody.token).toBe("string");
  expect(responseBody).toHaveProperty("user");
  expect(responseBody.user).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      firstName: "Juan",
      lastName: "Torres",
      email: email,
    })
  );
});

//Intercepción de respuesta de API
test("TC7 -Verificar registro exitoso con datos válidos verificando respuesta de la API", async ({ page, request }) => {
  await test.step("Completar el formulario de registro", async () => {
    const email = TestData.usuarioValido.email.split("@")[0] + Math.floor(Math.random() * 1000) + "@" + TestData.usuarioValido.email.split("@")[1];
    await paginaRegistro.completarFormularioRegistro(TestData.usuarioValido.nombre, TestData.usuarioValido.apellido, email, TestData.usuarioValido.contrasena);
    //guardamos la respuesta como trampa antes de registrarse exitosamente (listeners) - no se le coloca await porque aún no ha sucedido la request
    const mensajeCreacionCuenta = page.waitForResponse("**/api/auth/signup");
    await paginaRegistro.hacerClickEnBotonRegistro();
    const respuesta = await mensajeCreacionCuenta;

    //guardamos la respuesta y validamos su contenido
    const responseBody = await respuesta.json();

    expect(respuesta.status()).toBe(201);
    expect(responseBody).toHaveProperty("token");
    expect(typeof responseBody.token).toBe("string");
    expect(responseBody).toHaveProperty("user");
    expect(responseBody.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: TestData.usuarioValido.nombre,
        lastName: TestData.usuarioValido.apellido,
        email: email,
      })
    );

    await expect(page.getByText("Registro exitoso")).toBeVisible();
  });
});

test("TC8 -Verificar comportamiento front ante un email ya utilizado", async ({ page, request }) => {
  const email = TestData.usuarioValido.email.split("@")[0] + Math.floor(Math.random() * 1000) + "@" + TestData.usuarioValido.email.split("@")[1];
  //Interceptar la solicitud de registro y devolver un 409
  await page.route("**/api/auth/signup", (route) => {
    route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Email already in use",
      }),
    });
  });

  //llenar el formulario de registro
  await paginaRegistro.registrarUsuario(TestData.usuarioValido.nombre, TestData.usuarioValido.apellido, email, TestData.usuarioValido.contrasena);

  //verificar que se muestre el mensaje de error en el front
  await expect(page.getByText("Email already in use")).toBeVisible();
});
