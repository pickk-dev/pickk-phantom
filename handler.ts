import CrawlerController from './controllers/Crawl';

export const request = async (event, context, callback) => {
  const { url } = event.queryStringParameters;
  const option = await CrawlerController.request(url);
  console.log(option);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: {
        url,
        option
      }
    })
  });
};
