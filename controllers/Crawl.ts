import { getCrawler } from '../models/crawler';

const request = (url: string) => {
  const crawler = getCrawler(url);
  return crawler.request();
};

const CrawlerController = {
  request
};

export default CrawlerController;
