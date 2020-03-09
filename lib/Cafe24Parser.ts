import { evaluateData, stockData, optionDefaultData } from "../types/ICrawler";
import * as cheerio from "cheerio";

export const formatData = (type: evaluateData, data, optionNames: string[]) => {
  return type === "stock"
    ? formatStockData(data, optionNames)
    : formatOptionDefaultData(data, optionNames);
};

const formatOptionDefaultData = (
  data: optionDefaultData,
  optionNames: string[]
) => {
  const option = {
    values: {},
    isSoldOut: [],
    optionPrice: []
  };

  const optionPrice = JSON.parse(data.optionPrice);
  const optionPriceKeys = Object.keys(optionPrice);
  delete data.optionPrice;

  Object.values(data).forEach((value, index) => {
    option.values[optionNames[index]] = [];
    const $ = cheerio.load(value);
    $("body")
      .children()
      .each((i, ele) => {
        if (i >= 2) {
          option.values[optionNames[index]].push(ele.children[0].data);
          if (optionPriceKeys.includes(ele.attribs.value)) {
            option.optionPrice.push({
              option: [index, i - 2],
              price: optionPrice[ele.attribs.value]
            });
          }
        }
      });
  });

  return option;
};

const formatStockData = (data: stockData | boolean, optionNames: string[]) => {
  const option = {
    values: {},
    isSoldOut: [],
    optionPrice: []
  };

  if (optionNames.length !== 0)
    Object.values(data).forEach(item => {
      const [...values] = item.option_value_orginal;
      optionNames.forEach((optionName, index) => {
        option.values[optionName] = [
          ...new Set(option.values[optionName]).add(values[index])
        ];
      });
      if (
        item.is_selling === "F" ||
        (item.is_auto_soldout === "T" && item.stock_number === 0)
      ) {
        option.isSoldOut.push(
          values.map((value, index) =>
            option.values[optionNames[index]].findIndex(
              sumin => sumin === value
            )
          )
        );
      }
    });
  else option["itemIsSoldOut"] = data;

  return option;
};
