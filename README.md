# Lab8_Starter
Brandon Wang
Alvin Mac

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
No, since you would also have to test if the recipient has recieved the message at all.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, since you can design a test that feeds two lengths, one under the limit and one over to determine whether the feature is working properly.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
No browser UI will open, and the puppeteer will test all of the interactions through automation without a browser.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    // Test Q5 for README
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );
});
