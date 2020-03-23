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
import NotnnotCrawler from "./notnnot";
import CostumeoclockCrawler from "./costumeoclock";
import SuareCrawler from "./suare";
import HanceCrawler from "./hance";
import MaisonMinedCrawler from "./maisonmined";
import AdvisoryCrawler from "./advisory";
import ModnineCrawler from "./modnine";

export const getCrawler = (url: string): ICrawler => {
  const uniCodeUrl = encodeURI(url);

  const { origin } = new URL(uniCodeUrl);

  if (origin === "https://theknitcompany.com")
    return new TheKnitCompanyCrawler(uniCodeUrl);
  if (origin === "https://garment-lable.com")
    return new GarmentLableCrawler(uniCodeUrl);
  if (origin === "http://86road.co.kr" || origin === "https://86road.co.kr")
    return new EightySixRoadCrawler(uniCodeUrl);
  if (origin === "http://fatalism.co.kr" || origin === "https://fatalism.co.kr")
    return new FatalismCrawler(uniCodeUrl);
  if (
    origin === "http://piece-worker.com" ||
    origin === "https://piece-worker.com"
  )
    return new PieceWorkerCrawler(uniCodeUrl);
  if (
    origin === "http://bananafit.co.kr" ||
    origin === "https://bananafit.co.kr"
  )
    return new BananafitCrawler(uniCodeUrl);

  if (
    origin === "http://www.belier.co.kr" ||
    origin === "https://www.belier.co.kr"
  )
    return new BelierCrawler(uniCodeUrl);
  if (origin === "http://lohnt.co.kr" || origin === "https://lohnt.co.kr")
    return new LohntCrawler(uniCodeUrl);
  if (
    origin === "http://romanticmove.com" ||
    origin === "https://romanticmove.com"
  )
    return new RomanticMoveCrawler(uniCodeUrl);
  if (origin === "http://notnnot.com" || origin === "https://notnnot.com") {
    return new NotnnotCrawler(uniCodeUrl);
  }
  if (
    origin === "http://costumeoclock.com" ||
    origin === "https://costumeoclock.com"
  ) {
    return new CostumeoclockCrawler(uniCodeUrl);
  }
  if (origin === "http://suare.co.kr" || origin === "https://suare.co.kr") {
    return new SuareCrawler(uniCodeUrl);
  }
  if (origin === "https://hance.kr") {
    return new HanceCrawler(uniCodeUrl);
  }
  if (
    origin === "http://maison-mined.com" ||
    origin === "https://maison-mined.com"
  ) {
    return new MaisonMinedCrawler(url);
  }
  if (origin === "http://advisory.co.kr") {
    return new AdvisoryCrawler(url);
  }
  if (origin === "http://modnine.com" || origin === "https://modnine.com") {
    return new ModnineCrawler(url);
  }
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
