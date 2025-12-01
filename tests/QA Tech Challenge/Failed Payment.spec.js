import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

test('test', async ({ page }) => {

  //this is a production URL kindly change to Test Environment if needed
  await page.goto('https://www.amaysim.com.au/');

  //Choose SIM Plan>7 Days until it reached the next screen
  await page.getByRole('link', { name: 'SIM plans', exact: true }).click();
  await page.getByRole('link', { name: '7 day SIM plans' }).click();
  await page.getByRole('link', { name: 'Buy now' }).click();
  await page.getByText('pick a new number').first().click();
  await page.locator('.css-1ne7y3i > .css-ikyri5 > .css-kqzqgg').first().click();
  await page.locator('.css-1ne7y3i').first().click();
  await page.getByTestId('product-checkout-button').click();

  //Select and Enter here the User details
  await page.getByText('I\'m new to amaysim').click();
  await page.locator('label').filter({ hasText: 'I\'m new to amaysim' }).locator('svg').click();
  await page.getByRole('textbox', { name: 'first name' }).click();
  await page.getByRole('textbox', { name: 'first name' }).fill('Test');
  await page.getByRole('textbox', { name: 'first name' }).press('Tab');
  await page.getByRole('textbox', { name: 'last name' }).fill('Test');
  await page.getByRole('textbox', { name: 'date of birth' }).click();
  await page.getByRole('textbox', { name: 'date of birth' }).fill('05/05/1990');
  await page.getByRole('textbox', { name: 'email address' }).click();
  await page.getByRole('textbox', { name: 'email address' }).click();
  await page.getByRole('textbox', { name: 'email address' }).fill('test-qatech@yopmail.com');
  await page.getByRole('textbox', { name: 'create a password' }).click();
  await page.getByRole('textbox', { name: 'create a password' }).fill('test-qatech');
  await page.getByRole('textbox', { name: 'contact number' }).click();
  await page.getByRole('textbox', { name: 'contact number' }).fill('0412345678');
  await page.getByRole('textbox', { name: 'home or work address' }).click();
  await page.getByRole('textbox', { name: 'home or work address' }).fill('Level 6,17-19 Bridge St,');
  await page.getByText('Level 6 17-19 Bridge St,').click();

  //Choose Card Payment and Enter Card details, Card Details can be edited accordingly for testing purposes
  const iframe = page.frameLocator('//*[@id="payment-element"]/div/iframe');
  await iframe.locator('#card-tab').click();
  await iframe.locator('#Field-numberInput').fill('4242424242424242');
  await iframe.locator('#Field-expiryInput').fill('01/27');
  await iframe.locator('#Field-cvcInput').fill('123');

  await page.locator('.css-c5g9lg > .css-1u4x94i > .css-1ne7y3i > .css-1417z9a > .css-kqzqgg > path').click();
  await page.locator('div').filter({ hasText: /^pay now$/ }).nth(1).click(); 

  //This should show that Card Payment was Failed
  await page.getByText('Credit Card payment failed');

});