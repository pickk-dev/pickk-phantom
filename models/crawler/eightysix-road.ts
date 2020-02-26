import { getCafe24StockData } from '.';
declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class EightySixRoadCrawler {
  url: string;

  evaluate = () => {
    const params: { [name: string]: string } = {};
    window.location.search.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      (_, key, value) => {
        params[key] = value;
        return '';
      }
    );
    return EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[
      Number(params.product_no)
    ];
  };

  constructor(url: string) {
    this.url = url;
  }

  request = async () => {
    const stockData = await getCafe24StockData(this.url, this.evaluate);
    console.log(stockData);
    const option = {
      name: '옵션',
      items: [{ name: '사이즈', items: [] }]
    };
    Object.values(stockData).forEach(
      (
        value: {
          option_value_orginal: string[];
          stock_number: number;
          is_auto_soldout: 'T' | 'F';
        },
        index
      ) => {
        const [_color, size] = value.option_value_orginal;
        if (value.is_auto_soldout === 'T' && value.stock_number === 0) {
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
