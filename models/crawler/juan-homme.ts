import * as cheerio from "cheerio";

import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { getProductNum } from "../../lib/URLparser";
import { requestHtml } from "../../lib";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class JuanHommeCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    return {
      type: "stock" as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionValues = (hi: CheerioStatic) => {
    return {};
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const body = await requestHtml(this.url);
    const hi = cheerio.load(body);

    const scriptHtml = hi("body").html();

    let start = scriptHtml.indexOf('"aCombinationGroupName" : ') + 26;
    let end = scriptHtml.indexOf("]", start) + 1;

    const optionNames = JSON.parse(scriptHtml.slice(start, end));
    const values = {};
    optionNames.forEach((optionName) => {
      values[optionName] = [];
    });

    start = scriptHtml.indexOf('"aCombinationOption" : ') + 22;
    end = scriptHtml.indexOf("]", start) + 1;

    const optionStockList = JSON.parse(scriptHtml.slice(start, end)).map(
      (optionInfo) => {
        optionNames.forEach((_, i) => {
          const option = optionInfo["optionName" + (i + 1)];
          if (!values[optionNames[i]].includes(option))
            values[optionNames[i]].push(option);
        });
        return Number(optionInfo.stockQuantity);
      }
    );

    const remainder = values[optionNames[optionNames.length - 1]].length;

    const isSoldOut = optionStockList
      .map((n, i) => {
        if (n !== 0) {
          return;
        }

        return optionNames.length === 2
          ? [Math.floor(i / remainder), i % remainder]
          : [i];
      })
      .filter((value) => value);

    return Promise.resolve({
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
