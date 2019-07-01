// import axios from "axios";
// import * as cheerio from "cheerio";

import { AudioTarget } from "extract/models/AudioTarget";
// import { Response } from "extract/models/Response";

export class AudioTargetCBC extends AudioTarget {
  public id: string = "cbc";
  public name: string = "CBC";

  async getUrl() {
    return Promise.resolve("http://podcast.cbc.ca/mp3/hourlynews.mp3");
  }
}
