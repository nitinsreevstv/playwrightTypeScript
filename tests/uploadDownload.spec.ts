import {test, expect} from "@playwright/test"
import fs from 'fs';

test.beforeEach("Launching the URL", async({page}) =>{
    await page.goto("https://sdetqa.vercel.app/autoplay")

})

test.afterEach("Closing the page", async({page}) =>{
    await page.close()
})

test("File upload", async({page}) =>{
    const singleFileInput = page.locator('#singleFileInput')
    const uploadSingleButton = page.getByRole('button', { name: 'Upload Single File' })
    const uploadStatus = page.locator("singleFileStatus")

    await singleFileInput.setInputFiles("tests/testData/textFile.txt")
    await uploadSingleButton.click()
    const content = await uploadStatus.allInnerTexts()
    console.log(content);
    await expect(uploadStatus).toContainText(content)
})

test("Download File", async({page}) =>{
    const [download] = await Promise.all(
        [
            page.waitForEvent("download"),
            page.locator('button', { hasText: 'Download File' }).click()
        ]
    )
    expect(download.suggestedFilename()).toContain("sample.txt")

    const downloadPath = "downloads/sample.txt"
    await download.saveAs(downloadPath)
})