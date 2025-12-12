// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pom/LoginPage';
import { faker } from '@faker-js/faker';

test.skip('Valid login Automation exercice', async ({ page }) => {

  const login = new LoginPage(page);

  await page.goto('https://automationexercise.com/login');

  await login.AceitarCookies();

  await login.PreencherEmail(faker.internet.email());
  await login.PreencherSenha('Pa$$w0rd!');

  await login.ClicarNoBotaoLogin();

  await login.VerificarSeUsuarioEstaLogado();

});
