import axios from 'axios';
import * as cheerio from 'cheerio';

import { getCafe24Data } from '.';
import { ICrawler, evaluateData } from '../../types/ICrawler';
import { formatData } from '../../lib/Cafe24Parser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class GarmentLableCrawler implements ICrawler {
  url: string;

  evaluate = () => {
    const valuesPolyfill = object => {
      return Object.keys(object).map(key => object[key]);
    };

    const values = Object.values || valuesPolyfill;

    const productNum = window.location.href.split('/')[5];
    if (
      values(EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum])[0][
        'use_stock'
      ] === true
    ) {
      return {
        type: 'stock' as evaluateData,
        data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum]
      };
    } else {
      return {
        type: 'optionDefault' as evaluateData,
        data: EC_SHOP_FRONT_NEW_OPTION_DATA.aOptionDefaultData
      };
    }
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi('.infoArea > table > tbody > tr > th').each((_, ele) => {
      optionNames.push(...ele.children[0].data.split('-'));
    });
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
