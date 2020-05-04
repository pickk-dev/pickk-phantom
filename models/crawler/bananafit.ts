import axios from 'axios';
import * as cheerio from 'cheerio';

import { getCafe24Data } from '.';
import * as Cafe24Parser from '../../lib/Cafe24Parser';
import { ICrawler, evaluateData } from '../../types/Crawl';
import { getProductNum } from '../../lib/URLparser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class BananafitCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number) => {
    const valuesPolyfill = (object) => {
      return Object.keys(object).map((key) => object[key]);
    };

    const values = Object.values || valuesPolyfill;

    if (
      values(EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum])[0][
        'use_stock'
      ] === true
    ) {
      return {
        type: 'stock' as evaluateData,
        data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
      };
    } else {
      let data = EC_SHOP_FRONT_NEW_OPTION_DATA.aOptionDefaultData;
      const stockData =
        EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum];
      const keys = Object.keys(stockData);
      let optionPriceVariants = {};
      keys.forEach((key) => {
        const stock_price = Number(stockData[key].stock_price);
        if (stock_price !== 0) optionPriceVariants[key] = stock_price;
      });
      data['optionPriceVariants'] = JSON.stringify(optionPriceVariants);
      return {
        type: 'optionDefault' as evaluateData,
        data,
      };
    }
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi('#mun_option > div > div').each((_, ele) => {
      // tslint:disable-next-line: triple-equals
      if (ele.children[0].data !== undefined) {
        optionNames.push(ele.children[0].data);
      }
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

    const option = Cafe24Parser.formatData(type, data, optionNames);
    return Promise.resolve(option);
  };
}
