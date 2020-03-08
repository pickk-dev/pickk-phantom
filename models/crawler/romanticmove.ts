import axios from "axios";
import * as cheerio from "cheerio";

import { getCafe24Data } from ".";
import { ICrawler, evaluateData, evaluateResponse } from "../../types/ICrawler";
import { formatData } from "../../lib/Cafe24Parser";
import { getProductNo } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class RomanticMoveCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    const valuesPolyfill = object => {
      return Object.keys(object).map(key => object[key]);
    };

    const values = Object.values || valuesPolyfill;

    if (
      values(EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum])[0][
        "use_stock"
      ] === true
    ) {
      return {
        type: "stock" as evaluateData,
        data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum]
      };
    } else {
      return {
        type: "optionDefault" as evaluateData,
        data: EC_SHOP_FRONT_NEW_OPTION_DATA.aOptionDefaultData
      };
    }
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi("div.infoArea.soldout_displaynone > table > tbody > tr > th").each(
      (_, ele) => {
        optionNames.push(ele.children[0].data);
      }
    );
    return Promise.resolve(optionNames);
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNo(url);
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
