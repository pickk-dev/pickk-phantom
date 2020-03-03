import axios from 'axios';
import * as cheerio from 'cheerio';

import { getCafe24Data } from '.';
import { ICrawler, evaluateData, evaluateResponse } from '../../types/ICrawler';
import { formatData } from '../../lib/Cafe24Parser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class TheKnitCompanyCrawler implements ICrawler {
  url: string;

  evaluate = (): evaluateResponse => {
    return {
      type: 'stock' as evaluateData,
      data:
        EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[
          Number(window.location.href.split('/')[5])
        ]
    };
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi('.detail_right_wrap > div > div > div > table > tbody > tr > th').each(
      (_, ele) => {
        optionNames.push(...ele.children[0].data.split('-'));
      }
    );
    return Promise.resolve(optionNames);
  };

  constructor(url: string) {
    this.url = url;
  }

  request = async () => {
    const optionNames = await this.getOptionNames();
    const { type, data } = await getCafe24Data(this.url, this.evaluate);
    const option = formatData(type, data, optionNames);
    return Promise.resolve(option);
  };
}
