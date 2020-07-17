import axios from 'axios';
import * as cheerio from 'cheerio';

import { ICrawler, evaluateData, evaluateResponse } from '../../types/Crawl';
import { getProductNum } from '../../lib/URLparser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class OohAhhCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    return {
      type: 'stock' as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionValues = (hi: CheerioStatic) => {
    const label = hi('label[for="it_option_1"]').text();
    if (!label) {
      return {};
    }
    const values = [];
    hi('#it_option_1 > option').each((index, ele) => {
      if (index === 0) return;
      values.push(ele.children[0].data);
    });
    return {
      [label]: values,
    };
  };

  getSoldouts = (hi: CheerioStatic) => {
    const soldouts = [];
    hi('#it_option_1 > option').each((index, ele) => {
      if (index === 0) return;
      if (ele.attribs['value'].split(',').reverse()[0] === '0') {
        soldouts.push(index - 1);
      }
    });
    return soldouts;
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const { data: body } = await axios(this.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
      },
    });
    const hi = cheerio.load(body);

    const itemIsSoldOut = hi('body').html().includes('is_in_stock&quot;:false');
    const label = hi(
      'div.product-summary-wrap > div > div.col-sm-7.summary.entry-summary > form > table > tbody > tr > td.label > label'
    ).text();

    const values = { [label]: [] };
    const isSoldOut = [];
    hi(
      'div.product-summary-wrap > div > div.col-sm-7.summary.entry-summary > form > table > tbody > tr > td.value > select > option'
    ).each((index, ele) => {
      if (index === 0) return;
      values[label].push(ele.attribs['value']);
      if (itemIsSoldOut) {
        isSoldOut.push([index - 1]);
      }
    });
    return Promise.resolve({
      itemIsSoldOut,
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
