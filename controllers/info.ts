import InfoCrawlService from '../models/info-crawl';

const request = (url: string) => {
  const infoCrawlService = new InfoCrawlService(url);
  return infoCrawlService.crawl();
};

const InfoCrawlerController = {
  request,
};

export default InfoCrawlerController;
