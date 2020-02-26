export interface ICrawler {
  url: string;
  // tslint:disable-next-line: no-any
  request: () => any;
}
