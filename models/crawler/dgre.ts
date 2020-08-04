import axios from "axios";
import * as cheerio from "cheerio";

import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { getProductNum } from "../../lib/URLparser";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class DgreCrawler implements ICrawler {
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

  getSoldouts = (hi: CheerioStatic) => {
    const soldouts = [];
    return soldouts;
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);

    const label = hi(
      "#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption.custom-select-wrapper > span"
    ).text();

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
    return Promise.resolve({
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
