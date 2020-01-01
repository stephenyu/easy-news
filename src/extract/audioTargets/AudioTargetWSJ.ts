import * as Parser from "rss-parser";

import { AudioTarget } from "extract/models/AudioTarget";

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
    const firstNewsItem = feed.items.find(
      ({ title }) =>
        title.indexOf("News Brief") > -1 || title.indexOf("Morning Brief") > -1
    );

    if (firstNewsItem === undefined) throw "URL Not Found";
    else return firstNewsItem.enclosure.url;
  }

  async getUrl() {
    const parser = new Parser();
    const feed = (await parser.parseURL(
      "https://video-api.wsj.com/podcast/rss/wsj/minute-briefing"
    )) as RSSFeed;

    return this.extractNewsUrl(feed);
  }
}
