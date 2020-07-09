import axios from "axios";
import * as cheerio from "cheerio";

import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class KutletshopCrawler implements ICrawler {
  url: string;
  productNum: number;

  evaluate = (productNum: number): evaluateResponse => {
    return {
      type: "stock" as evaluateData,
      data: EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[productNum],
    };
  };

  getOptionValues = (hi: CheerioStatic) => {
    const label = hi("div.productOption.custom-select-wrapper > span")
      .each((_, ele) => ele.children[0].data)
      .toString();
    if (!label) {
      return {};
    }
    const values = [];
    hi(
      "div.productOption.custom-select-wrapper > div > div > div.custom-select-box-list-inner > div"
    ).each((index, ele) => {
      if (index === 0) return;
      values.push(ele.attribs["data-option-value"]);
    });
    return {
      [label]: values,
    };
  };

  getSoldouts = (hi: CheerioStatic) => {
    const soldouts = [];
    hi("#it_option_1 > option").each((index, ele) => {
      if (index === 0) return;
      if (ele.attribs["value"].split(",").reverse()[0] === "0") {
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

    let label;
    hi(
      "#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption.custom-select-wrapper > span"
    ).each((_, ele) => {
      label = ele.children[0].data;
    });

    const values = { [label]: [] };
    const isSoldOut = [];

    hi(
      "#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption.custom-select-wrapper > div > div > div.custom-select-box-list-inner > div"
    ).each((index, ele) => {
      if (index === 0) return;
      values[label].push(ele.attribs["data-option-value"]);
      if (ele.attribs["data-soldout"] === "true") {
        isSoldOut.push([index - 1]);
      }
    });

    const itemIsSoldOut = values[label].length === isSoldOut.length;

    return Promise.resolve({
      itemIsSoldOut,
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
