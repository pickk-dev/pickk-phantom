import axios from "axios";
import * as cheerio from "cheerio";

import { getCafe24Data } from ".";
import {
  ICrawler,
  evaluateData,
  evaluateResponse,
  stockData,
} from "../../types/Crawl";
import { formatData } from "../../lib/Cafe24Parser";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class NotnnotCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    return {
      type: "stock" as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionNames = async () => {
    const optionNames = [];
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    hi(
      "table.xans-element-.xans-product.xans-product-option.xans-record- select"
    ).each((_, ele) => {
      optionNames.push(ele.attribs.option_title);
    });

    if (optionNames.length === 0) {
      const scriptHtml = hi("body").html();
      const SEARCH_TEXT = "option_stock_data = '";
      const start = scriptHtml.indexOf(SEARCH_TEXT) + SEARCH_TEXT.length;
      const end = scriptHtml.indexOf("';", start);

      const optionStockData: stockData = JSON.parse(
        scriptHtml.slice(start, end).replace(/\\/g, "")
      );

      Object.values(optionStockData).forEach((optionObj) => {
        const { option_name } = optionObj;
        if (!optionNames.includes(option_name)) {
          optionNames.push(decodeURI(option_name.replace(/u/g, "\\u")));
        }
      });
    }
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
