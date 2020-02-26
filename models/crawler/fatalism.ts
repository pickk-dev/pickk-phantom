import { getCafe24StockData } from '.';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class FatalismCrawler {
  url: string;

  evaluate = () => {
    return EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[
      Number(window.location.href.split('/')[5])
    ];
  };

  constructor(url: string) {
    this.url = url;
  }

  request = async () => {
    const stockData = await getCafe24StockData(this.url, this.evaluate);
    const option = {
      name: '옵션',
      items: [{ name: '사이즈', items: [] }]
    };
    Object.values(stockData).forEach(
      (
        value: { option_value_orginal: string[]; stock_number: number },
        index
      ) => {
        const [size] = value.option_value_orginal;
        if (value.stock_number === 0) {
          return;
        }
        option.items[0].items.push({
          value: size,
          index: option.items[0].items.length
        });
      }
    );
    return Promise.resolve(option);
  };
}
