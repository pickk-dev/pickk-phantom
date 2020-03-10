import {
  evaluateData,
  stockData,
  optionDefaultData,
  itemOptionData
} from "../types/ICrawler";
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
  const option: itemOptionData = {
    values: {},
    isSoldOut: [],
    optionPriceVariants: [],
    productPriceVariants: []
  };

  const optionPriceVariants = JSON.parse(data.optionPriceVariants);
  const optionPriceVariantsKeys = Object.keys(optionPriceVariants);
  delete data.optionPriceVariants;

  Object.values(data).forEach((value, index) => {
    option.values[optionNames[index]] = [];
    const $ = cheerio.load(value);
    $("body")
      .children()
      .each((i, ele) => {
        if (i >= 2) {
          option.values[optionNames[index]].push(ele.children[0].data);
          if (optionPriceVariantsKeys.includes(ele.attribs.value)) {
            option.optionPriceVariants.push({
              option: [index, i - 2],
              price: optionPriceVariants[ele.attribs.value]
            });
          }
        }
      });
  });

  const optionValuesArr = Object.values(option.values);
  const divisorArr = optionValuesArr.map(e => e.length).reverse();
  let mul = 1;
  divisorArr.forEach(e => (mul *= e));
  const optionVariants = Array.apply(null, Array(mul)).map((_, index) => {
    let bf = index;
    let optionVariant = [];
    divisorArr.forEach(divisor => {
      optionVariant.unshift(Math.floor(bf % divisor));
      bf = Math.floor(bf / divisor);
    });
    return optionVariant;
  });

  optionVariants.forEach(optionVariant => {
    const totalPrice = option.optionPriceVariants.reduce(
      (acc, optionPriceVariant) => {
        const { option, price } = optionPriceVariant;
        return optionVariant[option[0]] === option[1] ? acc + price : acc;
      },
      0
    );
    if (totalPrice > 0)
      option.productPriceVariants.push({
        option: optionVariant,
        price: totalPrice
      });
  });

  return option;
};

const formatStockData = (data: stockData | boolean, optionNames: string[]) => {
  const option = {
    values: {},
    isSoldOut: [],
    optionPriceVariants: [],
    productPriceVariants: []
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
