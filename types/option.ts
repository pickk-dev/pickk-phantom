export type OptionResult = {
  values: { [name: string]: string[] };
  isSoldOut: number[][];
  itemIsSoldOut?: boolean;
  optionPriceVariants: priceVariant[];
  productPriceVariants: priceVariant[];
};

export type optionDefaultData = {
  [name: string]: string;
};

export type priceVariant = {
  option: number[];
  price: number;
};

export type stockData = {
  [name: string]: {
    option_value_orginal: string[];
    stock_number: number;
    is_auto_soldout: 'T' | 'F';
    is_selling: 'T' | 'F';
    stock_price: string;
    option_value_original: string[];
    option_name: string;
  };
};

export type SmartstoreStockRecord = {
  id: number;
  price: number;
  stockQuantity: number;
  regOrder: number;
  optionName1: string;
  optionName2: string;
  optionName3: string;
  optionName4: string;
  optionName5: string;
  todayDispatch: boolean;
};

export type SmartstoreStockData = SmartstoreStockRecord[];

export type MakeshopStockRecord = {
  opt_name: string;
  opt_values: string;
  opt_value: string;
  sto_price: number;
  sto_real_stock?: number;
};

export type MakeshopStockData = MakeshopStockRecord[];
