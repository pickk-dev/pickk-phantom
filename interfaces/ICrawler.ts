import { evaluateResponse } from 'types/Crawl';

export interface ICrawler {
  url: string;
  productNum: number;
  itemIsSoldOut?: boolean;
  evaluate?: (productNum: number) => evaluateResponse;
  // tslint:disable-next-line: no-any
  request: () => any;
}
