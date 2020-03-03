import axios from 'axios';

import { getCafe24Data } from '.';
import { ICrawler, evaluateData } from '../../types/ICrawler';
import { formatData } from '../../lib/Cafe24Parser';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class PieceWorkerCrawler implements ICrawler {
  url: string;

  evaluate = () => {
    return {
      type: 'stock' as evaluateData,
      data:
        EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[
          Number(window.location.href.split('/')[5])
        ]
    };
  };

  constructor(url: string) {
    this.url = url;
  }

  request = async () => {
    const optionNames = ['사이즈'];
    const { type, data } = await getCafe24Data(this.url, this.evaluate);
    const option = formatData(type, data, optionNames);
    return Promise.resolve(option);
  };
}
