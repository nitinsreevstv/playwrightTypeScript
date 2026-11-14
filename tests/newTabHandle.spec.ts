import {test, expect} from "@playwright/test"

test("New tab handle", async({browser}) =>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://sdetqa.vercel.app/autoplay")
    const newTabLocator = page.locator("button",{ hasText: 'New Tab'})

    const [newTab]=await Promise.all([
        context.waitForEvent("page"),
        newTabLocator.click()
    ])

    console.log(await newTab.title());

     await expect(newTab).toHaveTitle(/Playwright/)

    context.close()

})

test("New window handle", async({browser}) =>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://sdetqa.vercel.app/autoplay")
    const newTabLocator = page.locator("button",{ hasText: 'New Window'})

    const [newTab]=await Promise.all([
        context.waitForEvent("page"),
        newTabLocator.click()
    ])

    await page.waitForTimeout(2000)
    console.log(await newTab.title());

    await expect(newTab).toHaveTitle(/Playwright/)

    context.close()

})