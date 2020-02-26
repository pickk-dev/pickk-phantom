import * as phantom from 'phantom';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export default class TheKnitCompanyCrawler {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  request = async () => {
    const getSelectedPageContent = async () => {
      const instance = await phantom.create();
      const page = await instance.createPage();
      const status = await page.open(this.url);
      const data = await page.evaluate(() => {
        return EC_SHOP_FRONT_NEW_OPTION_DATA.aItemStockData[
          Number(window.location.href.split('/')[5])
        ];
      });
      return Promise.resolve(data);
    };

    const option = await getSelectedPageContent();
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
