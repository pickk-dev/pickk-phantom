import axios from 'axios';
import * as cheerio from 'cheerio';

import { ICrawler, evaluateData, evaluateResponse } from '../../types/Crawl';
import { getProductNum } from '../../lib/URLparser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class NomanualCrawler implements ICrawler {
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
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);

    const itemIsSoldOut = !hi(
      'div.shopProductCartErrorDiv.row.designSettingElement.text-body.hide'
    ).html();
    const label = hi(
      '#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption.custom-select-wrapper > span'
    ).text();

    const values = { [label]: [] };
    const isSoldOut = [];
    hi(
      '#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption.custom-select-wrapper > div > div > div.custom-select-box-list-inner > div'
    ).each((index, ele) => {
      if (index === 0) return;
      values[label].push(ele.attribs['data-option-value']);
      if (ele.attribs['data-soldout'] === 'true') {
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
