import axios from "axios";
import * as cheerio from "cheerio";

import { AudioTarget } from "../models/AudioTarget";
import { Response } from "../models/Response";

export class AudioTargetBBC extends AudioTarget {
  public id: string = "bbc";
  public name: string = "BBC";

  async getUrl() {
    return new Promise<string>(resolve => {
      axios
        .get("https://www.bbc.co.uk/programmes/p002vsn1/episodes/player")
        .then((response: Response) => {
          const $ = cheerio.load(response.data);

          const firstProgramme = $("div.br-box-page h2 a");
          const src = firstProgramme.attr("href");

          axios.get(src).then((response: Response) => {
            const $ = cheerio.load(response.data);
            const mp3Anchor = $("ul.popup__list li:nth-child(2) a");
            resolve(mp3Anchor.attr("href"));
          });
        });
    });
  }
}
