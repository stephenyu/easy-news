import * as Parser from "rss-parser";

import { AudioTarget } from "../models/AudioTarget";

interface RSSItem {
  title: string;
  enclosure: {
    url: string;
  };
}

interface RSSFeed {
  items: RSSItem[];
}

export class AudioTargetWSJ extends AudioTarget {
  public id: string = "wsj";
  public name: string = "Wall Street Journal";

  extractNewsUrl(feed: RSSFeed) {

    console.log(feed.items.map(({ title }) => title));
    const firstNewsItem = feed.items.find(
      ({ title }) => {
        console.log(title);
        return title.indexOf("Brief") > -1
      }
    );

    if (firstNewsItem === undefined) {
      throw "FirstNewsItem Not Found";
    }

    console.log(firstNewsItem);
    return firstNewsItem.enclosure.url;
  }

  async getUrl() {
    const parser = new Parser();
    const feed = (await parser.parseURL(
      "https://video-api.wsj.com/podcast/rss/wsj/minute-briefing"
    )) as RSSFeed;

    return this.extractNewsUrl(feed);
  }
}
