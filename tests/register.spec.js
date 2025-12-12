// @ts-check
import { test, expect } from '@playwright/test';
import RegisterPage from '../pom/RegisterPage';

test('Register a user', async ({ page }) => {

  const registerPage = new RegisterPage(page);
  await page.goto('https://automationexercise.com/login');

  
});
