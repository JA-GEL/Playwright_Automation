import { test, expect } from '@playwright/test';

test('Login Sucessfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);

  // 1. Login using the valid credentials (Username: standard_user , Password: secret_sauce)
  await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
  await page.getByText('Login').click();

  // 2. Select Product (Sauce Labs Bike Light)
  await expect(page).toHaveURL(/inventory.html/);
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="shopping-cart-link"]');

  // 3. Access Checkout Page
  await expect(page).toHaveURL(/cart.html/);
  //await expect(page).(/Sauce Labs Bolt T-Shirt/);
  await page.getByText('Checkout').click();

  // 4. Customer Information Fill
  await page.fill('#first-name', 'Joanne');
  await page.fill('#last-name', 'QA');
  await page.fill('#postal-code', '1111');
  await page.click('#continue');

  // 6. Finish Order
  await expect(page.locator('.summary_subtotal_label')).toContainText('9.99');
  await page.click('#finish');

  // 7. Verify Success Message
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  
});

test('Negative Case: Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // 1. Login using the invalid password (Username: standard_user , Password: secret_sauce1)
  await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce1');
  await page.getByText('Login').click();

  // Verify error message appears
  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('Username and password do not match any user in this service');
  });

  test('Edge Case: Empty Login Form Submission', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click login without entering data
  await page.click('#login-button');

  // Verify validation message for required fields
  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toContainText('Epic sadface: Username is required');
  });

  test('Edge Case: Empty Cart Checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    
// 1. Login using the valid credentials (Username: standard_user , Password: secret_sauce)
  await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
  await page.getByText('Login').click();

  // 2. Select Product (Sauce Labs Bike Light)
  await expect(page).toHaveURL(/inventory.html/);
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="remove-sauce-labs-bike-light"]');
  // Removed Item making the Checkout item 0
  await page.click('[data-test="shopping-cart-link"]');

  // 3. Access Checkout Page
  await expect(page).toHaveURL(/cart.html/);
  await page.getByText('Checkout').click();

  // 4. Customer Information Fill
  await page.fill('#first-name', 'Joanne');
  await page.fill('#last-name', 'QA');
  await page.fill('#postal-code', '1111');
  await page.click('#continue');

  // 6. Finish Order
  await expect(page.locator('.shopping_cart_badge')).toHaveText('0');
  await page.click('#finish');

  // 7. Verify Error Message
  await expect(page.locator('.complete-header')).toHaveText('Order Failed');

});