import { pool, parseHostName, correct, parseAll } from '../../lib';
import { InfoCrawlResult } from '../../types/InfoCrawl';

import * as crawlers from './crawlers';

export default class InfoCrawlService {
  private url: string;
  private host: string;
  private crawler;

  constructor(url: string) {
    this.url = encodeURI(url);
    this.host = this.getHost(this.url);
    this.crawler = this.getCrawler(this.host);
  }

  private getHost = (url: string): string => {
    return parseHostName(new URL(url).hostname);
  };

  private getCrawler = (host: string) => {
    const name = '_' + host.replace(/\.|-/g, '');
    return crawlers[name];
  };

  public crawl = async (): Promise<InfoCrawlResult> => {
    const result = await pool.use(async (instance) => {
      const page = await instance.createPage();
      await page.clearCookies();
      await page.open(this.url);
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      const result = await page.evaluate(this.crawler);
      await page.close();
      return Promise.resolve(result as InfoCrawlResult);
    });
    console.log(result);

    return correct(parseAll(result));
  };
}
