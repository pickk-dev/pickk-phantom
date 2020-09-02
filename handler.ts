import CrawlerController from './controllers/Crawl';
import InfoCrawlerController from './controllers/info';
import OptionCrawlerController from './controllers/option';

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

export const handleOptionRequest = async (url: string) => {
  const result = await OptionCrawlerController.request(url);

  return {
    url,
    ...result,
  };
};
