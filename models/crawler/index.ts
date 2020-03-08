import * as phantom from "phantom";

import { ICrawler, evaluateResponse } from "../../types/ICrawler";
import TheKnitCompanyCrawler from "./the-knit-company";
import FatalismCrawler from "./fatalism";
import PieceWorkerCrawler from "./piece-worker";
import GarmentLableCrawler from "./garment-lable";
import BananafitCrawler from "./bananafit";
import EightySixRoadCrawler from "./eightysix-road";
import LohntCrawler from "./lohnt";
import BelierCrawler from "./belier";
import RomanticMoveCrawler from "./romanticmove";

export const getCrawler = (url: string): ICrawler => {
  const { origin } = new URL(url);

  if (origin === "https://theknitcompany.com")
    return new TheKnitCompanyCrawler(url);
  if (origin === "https://garment-lable.com")
    return new GarmentLableCrawler(url);
  if (origin === "http://86road.co.kr" || origin === "https://86road.co.kr")
    return new EightySixRoadCrawler(url);
  if (origin === "http://fatalism.co.kr" || origin === "https://fatalism.co.kr")
    return new FatalismCrawler(url);
  if (
    origin === "http://piece-worker.com" ||
    origin === "https://piece-worker.com"
  )
    return new PieceWorkerCrawler(url);
  if (
    origin === "http://bananafit.co.kr" ||
    origin === "https://bananafit.co.kr"
  )
    return new BananafitCrawler(url);

  if (
    origin === "http://www.belier.co.kr" ||
    origin === "https://www.belier.co.kr"
  )
    return new BelierCrawler(url);
  if (origin === "http://lohnt.co.kr" || origin === "https://lohnt.co.kr")
    return new LohntCrawler(url);
  if (
    origin === "http://romanticmove.com" ||
    origin === "https://romanticmove.com"
  )
    return new RomanticMoveCrawler(url);
};

export const getCafe24Data = async (
  url,
  evaluate,
  productNum
): Promise<evaluateResponse> => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(url);
  const data = await page.evaluate(evaluate, productNum);
  return Promise.resolve(data as evaluateResponse);
};
