import fs from 'fs-extra';
import puppeteer from 'puppeteer';

const {nbRolls, nbCycles} = require('../appSettings.json');

(async () => {
  try {
    let counter = 0;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.tronbet.io/#/ring");

    await page.waitForFunction("window.socket3.connected === true");

    await page.addScriptTag({ path: "./dist/recorder.js" });

    while (counter < nbCycles) {
      const record = await page.evaluate(async () => {
        try {
          // @ts-ignore
          const rollRecorder = new Recorder();

          return new Promise(resolve => {
            rollRecorder.start(nbRolls, (data: Array<Array<string | number>>) => {
              resolve(data);
            });
          });
        } catch (e) {
          console.log(e);
        }
      });

      // await fs.writeFile(`./output/data-${counter}.json`, JSON.stringify(record));

      await fs.outputJSON(`./output/data-${counter}.json`, record);

      counter++;

      console.log(counter);
    }

    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();

console.log(nbRolls,nbCycles);