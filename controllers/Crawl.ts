import { getCrawler } from '../models/crawler';
import MongdolCrawler from 'models/crawler/mongdol';

const request = (url: string) => {
  const crawler = getCrawler(url);
  try {
    return crawler.request();
  } catch (err) {
    if (url.includes('costumeoclock')) {
      return new MongdolCrawler(encodeURI(url)).request();
    }
    throw err;
  }
};

const CrawlerController = {
  request,
};

export default CrawlerController;
