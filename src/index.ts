import fs from 'fs-extra';
import puppeteer from 'puppeteer';
import analyzer from './analyzer.js';
import countdown from './countdown.js';
import transfer from './transfer.js';

const {nbRolls, nbCycles} = require('../appSettings.json');

console.log(`Launching for ${nbCycles} cycles of ${nbRolls} rolls`);

(async () => {
  try {
    let counter = 0;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('starting in :')
    await countdown(10);
    console.log('started');

    await page.goto("https://www.tronbet.io/#/ring");

    await page.waitForFunction("window.socket3.connected === true");

    await page.addScriptTag({ path: "./dist/recorder.js" });

    while (counter < nbCycles) {
      const record = await page.evaluate(async ($nbRolls:number) => {
        try {
          // @ts-ignore
          const rollRecorder = new Recorder();

          return new Promise(resolve => {
            rollRecorder.start($nbRolls, (data: Array<Array<string | number>>) => {
              resolve(data);
            });
          });
        } catch (e) {
          console.log(e);
        }
      }, nbRolls);

      await fs.outputJSON(`./output/data-${counter}.json`, record);

      counter++;

      console.log(counter);
    }

    const folder = await transfer();

    if (folder) {
      const analysisData = await analyzer(folder);
      console.log(analysisData);
      await fs.outputJSON(`./analysis/${folder}/results.json`, analysisData);
    }

    console.log('Done');

    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();

