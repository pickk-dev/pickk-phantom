export interface ICrawler {
  url: string;
  evaluate: () => evaluateResponse;
  // tslint:disable-next-line: no-any
  request: () => any;
}

export type evaluateResponse = {
  type: evaluateData;
  // tslint:disable-next-line: no-any
  data: stockData | optionDefaultData;
};

export type evaluateData = 'stock' | 'optionDefault';

export type stockData = {
  [name: string]: {
    option_value_orginal: string[];
    stock_number: number;
    is_auto_soldout: 'T' | 'F';
  };
};

export type optionDefaultData = {
  [name: string]: string;
};
