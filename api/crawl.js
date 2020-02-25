const axios = require('axios');
const cheerio = require('cheerio');

module.exports.request = async (event, context, callback) => {
  // data 읽기
  const { data: html } = await axios(event['queryStringParameters']['url']);
  const $ = cheerio.load(html);

  const search = $('#product_option_id1');
  const colors = [];
  search.children().each((i, e) => {
    if (i >= 2) {
      colors.push($(e).text());
    }
  });
  console.log(colors);
  const options_set = [];

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      data: colors
    })
  });
};
