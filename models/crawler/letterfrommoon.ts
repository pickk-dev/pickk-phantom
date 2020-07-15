import axios from "axios";
import * as cheerio from "cheerio";

import { getCafe24Data } from ".";
import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { formatData } from "../../lib/Cafe24Parser";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class LetterFromMoonCrawler implements ICrawler {
  url: string;
  productNum: number;
  itemIsSoldOut: boolean;

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
      "table.xans-element-.xans-product.xans-product-option.option_table.xans-record- > tbody.xans-element-.xans-product.xans-product-option.xans-record- > tr > th"
    ).each((_, ele) => {
      optionNames.push(ele.children[0].data);
    });
    this.setItemIsSoldOut(hi);
    return Promise.resolve(optionNames);
  };

  setItemIsSoldOut = (hi: CheerioStatic) => {
    hi(
      "div.xans-element-.xans-product.xans-product-action > div.ec-base-button > span.displaynone"
    ).each((_, ele) => {
      if (ele.children[0].data === "SOLD OUT") this.itemIsSoldOut = false;
    });
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
    this.itemIsSoldOut = true;
  }

  request = async () => {
    const optionNames = await this.getOptionNames();
    const { type, data } = await getCafe24Data(
      this.url,
      this.evaluate,
      this.productNum
    );
    const option =
      data === undefined
        ? formatData(type, this.itemIsSoldOut, optionNames)
        : formatData(type, data, optionNames);

    return Promise.resolve({
      ...option,
      isSoldOut:
        this.itemIsSoldOut && optionNames.length !== 0
          ? option.values[optionNames[0]].map((_v, i) => [i])
          : [],
    });
  };
}
