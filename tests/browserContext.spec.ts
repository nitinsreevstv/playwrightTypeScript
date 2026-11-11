import {expect, test} from '@playwright/test';

test("Browser context intiate", async({page}) =>{
    const page1 = await page.context().newPage();
    const page2 = await page.context().newPage();

    await page1.goto("https://playwright.dev/");

    await page2.goto("https://www.google.com/");

    console.log(await page1.title());
    console.log(await page2.title());
})

test("Running browser in dark theme", async({browser}) =>{
    const context = await browser.newContext({
        colorScheme: "dark",
        permissions: [
            "geolocation",
            "notifications",
            "camera",
            "microphone"
        ],
        locale: "en-US",
        timezoneId: "Asia/Kolkata"
    });
    const page = await context.newPage();
    await page.goto("https://playwright.dev/");

})