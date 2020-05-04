import { getCafe24Data } from '.';
import { ICrawler, evaluateData } from '../../types/Crawl';
import { formatData } from '../../lib/Cafe24Parser';
import { getProductNum } from '../../lib/URLparser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class FatalismCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number) => {
    return {
      type: 'stock' as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const optionNames = ['사이즈'];
    const { type, data } = await getCafe24Data(
      this.url,
      this.evaluate,
      this.productNum
    );
    const option = formatData(type, data, optionNames);
    return Promise.resolve(option);
  };
}
