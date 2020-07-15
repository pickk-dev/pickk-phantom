import axios from "axios";
import * as cheerio from "cheerio";

import { ICrawler, evaluateData, evaluateResponse } from "../../types/Crawl";
import { getProductNum } from "../../lib/URLparser";
import { captureRejectionSymbol } from "events";

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class OjosCrawler implements ICrawler {
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

    let labels = [];
    const values = {};
    hi(
      "#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div.productOption > span.custom-select-option-name"
    ).each((_, ele) => {
      labels.push(ele.children[0].data);
      values[ele.children[0].data] = [];
    });

    const isSoldOut = [];
    const optionIsSoldOutList = [];

    hi(
      "#shopProductContentInfo > div.shopProductOptionListDiv.row.selectOptions.designSettingElement.text-body > div > div > div > div.custom-select-box-list-inner > div.custom-select-option"
    ).each((index, ele) => {
      if (ele.attribs["data-option-value"] === undefined) return;
      if (ele.attribs["data-option-index"] === "0") {
        values[labels[0]].push(ele.attribs["data-option-value"]);
        if (labels.length === 1 && ele.attribs["data-soldout"] === "true") {
          isSoldOut.push([index - 1]);
        }
        return;
      }
      if (labels.length === 2 && ele.attribs["data-option-index"] === "1") {
        values[labels[1]].push(ele.attribs["data-option-value"]);
        optionIsSoldOutList.push(ele.attribs["data-soldout"] === "true");
      }
    });

    if (labels.length === 2) {
      optionIsSoldOutList.forEach((data, index) => {
        if (data === true)
          isSoldOut.push([
            Math.floor(index / labels.length),
            index % labels.length,
          ]);
      });
      values[labels[1]] = Array.from(new Set(values[labels[1]]));
    }

    let itemIsSoldOut = true;
    hi("div.shopProductCartErrorDiv.hide > span.text").each((index, ele) => {
      if (ele.children[0].data === "품절된 상품입니다.") itemIsSoldOut = false;
    });

    return Promise.resolve({
      itemIsSoldOut,
      values,
      isSoldOut,
      optionPriceVariants: [],
      productPriceVariants: [],
    });
  };
}
