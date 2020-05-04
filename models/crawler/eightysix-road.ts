import axios from 'axios';
import * as cheerio from 'cheerio';

import { getCafe24Data } from '.';
import { ICrawler, evaluateData } from '../../types/Crawl';
import { formatData } from '../../lib/Cafe24Parser';
import { getProductNum } from '../../lib/URLparser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class EightySixRoadCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number) => {
    return {
      type: 'stock' as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi('#mun_option > .mun-option > .mun-detail-title').each((_, ele) => {
      optionNames.push(...ele.children[0].data.split('-'));
    });
    return Promise.resolve(optionNames);
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const optionNames = await this.getOptionNames();
    const { type, data } = await getCafe24Data(
      this.url,
      this.evaluate,
      this.productNum
    );
    const option = formatData(type, data, optionNames);
    return Promise.resolve(option);
  };
}
