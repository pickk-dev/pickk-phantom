import * as cheerio from 'cheerio';

import { ICrawler, evaluateData, evaluateResponse } from '../../types/Crawl';
import { formatData } from '../../lib/Cafe24Parser';
import { getProductNum } from '../../lib/URLparser';
import { requestHtml } from '../../lib';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class MongdolCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    return {
      type: 'stock' as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionNames = async () => {
    const optionNames = [];
    const body = await requestHtml(this.url);
    const hi = cheerio.load(body);

    const SEARCH_TEXT = "option_stock_data = '";
    const start = body.indexOf(SEARCH_TEXT) + SEARCH_TEXT.length;
    const end = body.indexOf("';var stock_manage", start);
    const optionDataStr = decodeURI(
      body.slice(start, end).replace(/\\/gi, '"').replace(/\"\"/gi, '"')
    );
    const optionData = JSON.parse(optionDataStr);

    hi(
      '#contents > div.container2 > div.item2 > div > div.infoArea > table > tbody.xans-element-.xans-product.xans-product-option.xans-record- > tr > th'
    ).each((_, ele) => {
      optionNames.push(ele.children[0].data);
    });
    return Promise.resolve([optionNames, optionData]);
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const [optionNames, optionData] = await this.getOptionNames();
    const option = formatData('stock' as evaluateData, optionData, optionNames);
    return Promise.resolve(option);
  };
}
