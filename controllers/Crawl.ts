import { getCrawler } from '../models/crawler';
import MongdolCrawler from '../models/crawler/mongdol';

const request = async (url: string) => {
  const crawler = getCrawler(url);
  try {
    const result = await crawler.request();
    return result;
  } catch (err) {
    if (url.includes('costumeoclock')) {
      const result = await new MongdolCrawler(encodeURI(url)).request();
      return result;
    }
    throw err;
  }
};

const CrawlerController = {
  request,
};

export default CrawlerController;
