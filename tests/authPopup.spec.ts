import {test, expect} from "@playwright/test"

// https://the-internet.herokuapp.com/basic_auth

const URL = "https://the-internet.herokuapp.com/basic_auth"

test("Auth popup", async({browser}) =>{
    const context = await browser.newContext({
        httpCredentials: {
            username: "admin",
            password: "admin"
        }
    })
    const page = await context.newPage()

    await page.goto(URL)
    await expect(page.locator("text=Congratulations")).toBeVisible()

})