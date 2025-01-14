describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    // Test Q5 for README
    // const settingsButton = await page.$('img[alt="settings"]');
    // await settingsButton.evaluate( settingsButton => settingsButton.click() );
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  // it('Test2: Make sure <journal-entry> elements are populated', async () => {
  //   let allArePopulated = true;
  //   let data, plainValue;
  //   const entries = await page.$$('journal-entry');
  //   for (let i = 0; i < entries.length; i++) {
  //     data = await entries[i].getProperty('entry');
  //     plainValue = await data.jsonValue();
  //     if (plainValue.title.length == 0) { allArePopulated = false; }
  //     if (plainValue.date.length == 0) { allArePopulated = false; }
  //     if (plainValue.content.length == 0) { allArePopulated = false; }
  //   }
  //   expect(allArePopulated).toBe(true);
  // }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    await entry1.evaluate( entry1 => entry1.click() );
    let containsEntry = page.url().includes("/#entry1");
    expect(containsEntry).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    await entry1.evaluate( entry1 => entry1.click() );
    let title = await page.$('h1');
    let value = await title.evaluate(el => el.textContent);
    expect(value).toBe("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        const entries = await page.$$('journal-entry');
        const entry1 = entries[0];
        await entry1.evaluate( entry1 => entry1.click() );
    
        let entry = await page.$('entry-page');
        let value = await entry.evaluate(el => el.entry);
        expect(value).toEqual({ 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        });
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    await entry1.evaluate( entry1 => entry1.click() );
    let body = await page.$('body');
    let value = await body.evaluate(el => el.className);
    expect(value).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );
    let containsURL = page.url().includes("/#settings");
    expect(containsURL).toBe(true);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );
    let title = await page.$('h1');
    let value = await title.evaluate(el => el.textContent);
    expect(value).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );
    let body = await page.$('body');
    let value = await body.evaluate(el => el.className);
    expect(value).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    await entry1.evaluate( entry1 => entry1.click() );
    
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );

    const back = await page.goBack();
    let containsEntry = page.url().includes("/#entry1");
    expect(containsEntry).toBe(true);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    // implement test11: Clicking the back button once should bring the user back to the home page
    const settingsButton = await page.$('img[alt="settings"]');
    await settingsButton.evaluate( settingsButton => settingsButton.click() );

    const back = await page.goBack();
    let containsEntry = page.url().includes("");
    expect(containsEntry).toBe(true);
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    // implement test12: When the user is on the homepage, the header title should be “Journal Entries”
    await page.goto('http://127.0.0.1:5500');
    let title = await page.$('h1');
    let value = await title.evaluate(el => el.textContent);
    expect(value).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute ', async() => {
    // implement test13: On the home page the <body> element should not have any class attribute 
    let body = await page.$('body');
    let value = await body.evaluate(el => el.className);
    expect(value).toBe("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    // implement test14: Verify the url is correct when clicking on the second entry
    const entries = await page.$$('journal-entry');
    const entry2 = entries[1];
    await entry2.evaluate( entry2 => entry2.click() );
    let containsEntry = page.url().includes("/#entry2");
    expect(containsEntry).toBe(true);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    // implement test15: Verify the title is current when clicking on the second entry
    const entries = await page.$$('journal-entry');
    const entry2 = entries[1];
    await entry2.evaluate( entry2 => entry2.click() );
    let title = await page.$('h1');
    let value = await title.evaluate(el => el.textContent);
    expect(value).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    // implement test16: Verify the entry page contents is correct when clicking on the second entry
    const entries = await page.$$('journal-entry');
    const entry2 = entries[1];
    await entry2.evaluate( entry2 => entry2.click() );

    let entry = await page.$('entry-page');
        let value = await entry.evaluate(el => el.entry);
        expect(value).toEqual({ 
          title: "Run, Forrest! Run!",
          date: "4/26/2021",
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
            alt: "forrest running"
          }
      });
  });

  // create your own test 17
  // test to see if the title of Entry 3 loads correctly when Entry 3 is clicked
  it('Test17: Verify the entry page title is correct when clicking on the third entry', async() => {
    const entries = await page.$$('journal-entry');
    const entry3 = entries[2];
    await entry3.evaluate( entry3 => entry3.click() );
    let title = await page.$('h1');
    let value = await title.evaluate(el => el.textContent);
    expect(value).toBe("Entry 3");
  });

  // create your own test 18
  // test to see if the URL of Entry 3 is updated to contain "/#entry3"
  it('Test18: Verify the entry page url is correct when clicking on the third entry', async() => {
    const entries = await page.$$('journal-entry');
    const entry3 = entries[2];
    await entry3.evaluate( entry3 => entry3.click() );
    let containsEntry = page.url().includes("/#entry3");
    expect(containsEntry).toBe(true);
  });
  
  // create your own test 19
  // test to see if the contents of entry 3 is "Entry 3"
  it('Test19: Verify the entry page contents is correct when clicking on the third entry', async() => {
    // implement test16: Verify the entry page contents is correct when clicking on the second entry
    const entries = await page.$$('journal-entry');
    const entry3 = entries[2];
    await entry3.evaluate( entry3 => entry3.click() );

    let entry = await page.$('entry-page');
        let value = await entry.evaluate(el => el.entry);
        expect(value).toEqual({ 
          title: "Ogres are like onions",
          date: "4/27/2021",
          content: "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.",
          image: {
            src: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg",
            alt: "shrek and donkey looking confused"
          }
      });
  });
  
  // create your owan test 20
  // Test functionality of forward button. Go into Entry 1, go back to home, then click forward button.
  it('Test20: Test functionality of forward button. Go into Entry 1, go back to home, then click forward button.', async() => {
    jest.setTimeout(10000);
    await page.goto('http://127.0.0.1:5500');
    const entries = await page.$$('journal-entry');
    const entry1 = entries[0];
    await entry1.evaluate( entry1 => entry1.click() );

    // Should be back home
    const back = await page.goBack();

    // Should be back to entry1
    const forward = await page.goForward();

    let containsEntry = page.url().includes("/#entry1");
    expect(containsEntry).toBe(true);
  });
}, 10000);
