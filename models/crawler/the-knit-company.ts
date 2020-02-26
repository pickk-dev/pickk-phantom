import { getCafe24StockData } from '.';

export default class TheKnitCompanyCrawler {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  request = async () => {
    const option = await getCafe24StockData(this.url);
    const items = {};
    Object.values(option).forEach(
      (value: { option_value_orginal: string[]; stock_number: number }) => {
        const [color, size] = value.option_value_orginal;
        if (value.stock_number === 0) {
          return;
        }
        items[color] = Array.apply(null, items[color]).concat(size);
      }
    );
    return Promise.resolve(items);
  };
}
