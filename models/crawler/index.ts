import * as phantom from 'phantom';

import { ICrawler } from '../../types/ICrawler';
import TheKnitCompanyCrawler from './the-knit-company';
import GarmentLableCrawler from './garment-lable';
import EightySixRoadCrawler from './eightysix-road';

declare const EC_SHOP_FRONT_NEW_OPTION_DATA;

export const getCrawler = (url: string): ICrawler => {
  const { origin } = new URL(url);

  if (origin === 'https://theknitcompany.com')
    return new TheKnitCompanyCrawler(url);
  if (origin === 'https://garment-lable.com')
    return new GarmentLableCrawler(url);
  if (origin === 'http://86road.co.kr' || origin === 'https://86road.co.kr')
    return new EightySixRoadCrawler(url);
};

export const getCafe24StockData = async (url, evaluate) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(url);
  const data = await page.evaluate(evaluate);
  return Promise.resolve(data);
};
