import { AudioTarget } from "extract/models/AudioTarget";

export class AudioTargetCBC extends AudioTarget {
  public id: string = "cbc";
  public name: string = "CBC";

  async getUrl() {
    return Promise.resolve("http://podcast.cbc.ca/mp3/hourlynews.mp3");
  }
}
