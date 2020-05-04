import CrawlerController from './controllers/Crawl';
import InfoCrawlerController from './controllers/info';

export const request = async (event, context, callback) => {
  const { url } = event.queryStringParameters;
  const option = await CrawlerController.request(url);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        url,
        option,
      },
    }),
  });
};

export const handleRequest = async (url: string) => {
  const option = await CrawlerController.request(url);

  return {
    url,
    option,
  };
};

export const handleInfoRequest = async (url: string) => {
  const result = await InfoCrawlerController.request(url);

  return {
    url,
    ...result,
  };
};
