import axios from "axios";
import * as cheerio from "cheerio";

import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class InrowsCrawler implements ICrawler {
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
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);

    const label = "사이즈";

    const values = { [label]: [] };
    const isSoldOut = [];
    hi(
      "#form1 > div > div.table-opt > table > tbody > tr:nth-child(3) > td > div > dl > dd > select > option"
    ).each((index, ele) => {
      if (index === 0) return;
      values[label].push(ele.children[0].data);
    });
    const scriptHtml = hi("body").html();
    const start = scriptHtml.indexOf("optionJsonData = ") + 17;
    const end = scriptHtml.indexOf(";", start);

    scriptHtml
      .slice(start, end)
      .split("sto_real_stock:'")
      .map((unrefinedOption) => Number(unrefinedOption.split("'")[0]))
      .slice(1)
      .forEach((stock, index) => {
        if (stock === 0) isSoldOut.push([index]);
      });

    return Promise.resolve({
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
