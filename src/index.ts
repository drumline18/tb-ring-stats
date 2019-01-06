import fs from 'fs-extra';
import puppeteer from 'puppeteer';
// const fs = require("nano-fs"); // promise-based 'fs'

(async () => {
  try {
    let counter = 0;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.tronbet.io/#/ring");

    await page.waitForFunction("window.socket3.connected === true");

    await page.addScriptTag({ path: "./dist/recorder.js" });

    while (counter < 12) {
      const record = await page.evaluate(async () => {
        try {
          // @ts-ignore
          const rollRecorder = new Recorder();

          return new Promise(resolve => {
            rollRecorder.start(100, (data: Array<Array<string | number>>) => {
              resolve(data);
            });
          });
        } catch (e) {
          console.log(e);
        }
      });

      await fs.writeFile(`./output/data-${counter}.json`, JSON.stringify(record));

      counter++;

      console.log(counter);
    }

    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
