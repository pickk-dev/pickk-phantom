import axios from "axios";
import * as cheerio from "cheerio";

import { getCafe24Data } from ".";
import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { formatData } from "../../lib/Cafe24Parser";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class KingArchivesCrawler implements ICrawler {
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
      "#contents > div.xans-element-.xans-product.xans-product-detail > div.infoArea > div.product_etc_option > table > tbody > tr > th"
    ).each((_, ele) => {
      optionNames.push(...ele.children[0].data.split("+")[1].trim().split("-"));
    });

    this.setItemIsSoldOut(hi);
    return Promise.resolve(optionNames);
  };

  setItemIsSoldOut = (hi: CheerioStatic) => {
    hi(
      "#contents > div.xans-element-.xans-product.xans-product-detail > div.infoArea > div.xans-element-.xans-product.xans-product-detaildesign > table > tbody > tr:nth-child(3) > td > pre > span"
    ).each((_, ele) => {
      if (ele.children[0].data === "Sold Out") this.itemIsSoldOut = true;
    });
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
    this.itemIsSoldOut = false;
  }

  request = async () => {
    const optionNames = await this.getOptionNames();
    const { type, data } = await getCafe24Data(
      this.url,
      this.evaluate,
      this.productNum
    );
    const option = formatData(type, data, optionNames);

    return this.itemIsSoldOut
      ? Promise.resolve({
          ...option,
          isSoldOut:
            Object.keys(option.values).length > 1
              ? Array.apply(
                  null,
                  Array(
                    option.values[optionNames[0]].length *
                      option.values[optionNames[1]].length
                  )
                ).map((_, i) => [
                  Math.floor(i / option.values[optionNames[1]].length),
                  i % option.values[optionNames[1]].length,
                ])
              : option.values[optionNames[0]].map((_v, i) => [i]),
        })
      : Promise.resolve(option);
  };
}
