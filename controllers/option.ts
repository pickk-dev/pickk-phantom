import OptionCrawlService from '../models/option-crawl';

const request = (url: string) => {
  const optionCrawlServiceInstance = new OptionCrawlService(url);
  return optionCrawlServiceInstance.crawl();
};

const OptionCrawlerController = {
  request,
};

export default OptionCrawlerController;
