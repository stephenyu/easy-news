import * as cheerio from "cheerio";
import * as puppeteer from "puppeteer";

import { AudioTarget } from "extract/models/AudioTarget";

export class AudioTargetWSJ extends AudioTarget {
  public id: string = "wsj";
  public name: string = "Wall Street Journal";

  async getUrl() {
    return new Promise<string>(async resolve => {
      const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser"
      });
      const page = await browser.newPage();
      await page.goto("https://www.wsj.com/podcasts/minute-briefing");
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      await browser.close();

      const $ = cheerio.load(bodyHTML);
      const firstAudio = $("audio:first-child");
      resolve(firstAudio.attr("src"));
    });
  }
}
