export interface ICrawler {
  url: string;
  productNum: number;
  itemIsSoldOut?: boolean;
  evaluate?: (productNum: number) => evaluateResponse;
  // tslint:disable-next-line: no-any
  request: () => any;
}

export type evaluateResponse = {
  type: evaluateData;
  data: stockData | optionDefaultData | boolean;
};

export type evaluateData = "stock" | "optionDefault";

export type stockData = {
  [name: string]: {
    option_value_orginal: string[];
    stock_number: number;
    is_auto_soldout: "T" | "F";
    is_selling: "T" | "F";
    stock_price: string;
    option_value_original: string[];
  };
};

export type optionDefaultData = {
  [name: string]: string;
};

export type itemOptionData = {
  values: { [name: string]: string[] };
  isSoldOut: Array<number[]>;
  optionPriceVariants: priceVariant[];
  productPriceVariants: priceVariant[];
};

export type priceVariant = {
  option: number[];
  price: number;
};
