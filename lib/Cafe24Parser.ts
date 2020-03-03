import { evaluateData, stockData, optionDefaultData } from '../types/ICrawler';

export const formatData = (type: evaluateData, data, optionNames: string[]) => {
  return type === 'stock'
    ? formatStockData(data, optionNames)
    : formatOptionDefaultData(data, optionNames);
};

const formatOptionDefaultData = (
  data: optionDefaultData,
  optionNames: string[]
) => {
  const option = {
    name: '옵션',
    items: []
  };

  Object.values(data).forEach((value, index) => {
    option.items.push({ name: optionNames[index], items: [] });
    const $ = cheerio.load(value);
    $('body')
      .children()
      .each((i, ele) => {
        if (i >= 2) {
          option.items[index].items.push({
            value: ele.children[0].data,
            index: option.items[index].items.length
          });
        }
      });
  });

  return option;
};

const formatStockData = (data: stockData, optionNames: string[]) => {
  const option = {
    values: {},
    isSoldOut: []
  };

  Object.values(data).forEach(item => {
    const [...values] = item.option_value_orginal;
    optionNames.forEach((optionName, index) => {
      option.values[optionName] = [
        ...new Set(option.values[optionName]).add(values[index])
      ];
    });
    if (item.stock_number === 0) {
      option.isSoldOut.push(
        values.map((value, index) =>
          option.values[optionNames[index]].findIndex(sumin => sumin === value)
        )
      );
    }
  });

  return option;
};
