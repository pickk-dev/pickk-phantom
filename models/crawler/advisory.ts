import axios from "axios";
import * as cheerio from "cheerio";

import { ICrawler } from "../../types/ICrawler";
import { getProductNum } from "../../lib/URLparser";

export default class AdvisoryCrawler implements ICrawler {
  url: string;
  productNum: number;

  getOption = async () => {
    const { data: body } = await axios(this.url);
    const hi = cheerio.load(body);
    const { optionValues, isSoldOut } = this.getOptionValues(hi);
    return Promise.resolve({
      values: {
        [this.getOptionName(hi)]: optionValues
      },
      isSoldOut
    });
  };

  getOptionName = (hi: CheerioStatic) => {
    let optionName;
    hi("div.item_add_option_box > dl > dt").each((_, ele) => {
      optionName = ele.children[0].data;
    });
    return optionName;
  };

  getOptionValues = (hi: CheerioStatic) => {
    const optionValues = [];
    const isSoldOut = [];
    hi("div.item_add_option_box > dl > dd > select > option").each((i, ele) => {
      if (ele.attribs.disabled) isSoldOut.push([i - 1]);
      if (ele.attribs.value)
        optionValues.push(ele.children[0].data.split("[품절]")[0].trim());
    });
    return { optionValues, isSoldOut };
  };

  constructor(url: string) {
    this.url = url;
    this.productNum = getProductNum(url);
  }

  request = async () => {
    const option = await this.getOption();
    option["optionPriceVariants"] = [];
    option["productPriceVariants"] = [];
    return Promise.resolve(option);
  };
}
