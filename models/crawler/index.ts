import { pool } from '../../lib/Phantom';

import { ICrawler, evaluateResponse } from '../../types/Crawl';
import TheKnitCompanyCrawler from './the-knit-company';
import FatalismCrawler from './fatalism';
import PieceWorkerCrawler from './piece-worker';
import GarmentLableCrawler from './garment-lable';
import BananafitCrawler from './bananafit';
import EightySixRoadCrawler from './eightysix-road';
import LohntCrawler from './lohnt';
import BelierCrawler from './belier';
import RomanticMoveCrawler from './romanticmove';
import NotnnotCrawler from './notnnot';
import CostumeoclockCrawler from './costumeoclock';
import SuareCrawler from './suare';
import HanceCrawler from './hance';
import MaisonMinedCrawler from './maisonmined';
import AdvisoryCrawler from './advisory';
import ModnineCrawler from './modnine';
import CurrentCrawler from './current';
import PavementCrawler from './pavement';
import PartsCrawler from './parts';
import FlareupCrawler from './flareup';
import HaleineCrawler from './haleine';
import Phos333Crawler from './phos333';
import WazeCralwer from './waze';
import MassnounCrawler from './massnoun';
import RdvzCrawler from './rdvz';
import NomanualCrawler from './nomanual';
import { parseHostName } from '../../lib';

export const getCrawler = (url: string): ICrawler => {
  const uniCodeUrl = encodeURI(url);

  const host = parseHostName(new URL(uniCodeUrl).hostname);

  if (host === 'theknitcompany.com')
    return new TheKnitCompanyCrawler(uniCodeUrl);
  if (host === 'garment-lable.com') return new GarmentLableCrawler(uniCodeUrl);
  if (host === '86road.co.kr') return new EightySixRoadCrawler(uniCodeUrl);
  if (host === 'fatalism.co.kr') return new FatalismCrawler(uniCodeUrl);
  if (host === 'piece-worker.com') return new PieceWorkerCrawler(uniCodeUrl);
  if (host === 'bananafit.co.kr') return new BananafitCrawler(uniCodeUrl);
  if (host === 'belier.co.kr') return new BelierCrawler(uniCodeUrl);
  if (host === 'lohnt.co.kr') return new LohntCrawler(uniCodeUrl);
  if (host === 'romanticmove.com') return new RomanticMoveCrawler(uniCodeUrl);
  if (host === 'notnnot.com') return new NotnnotCrawler(uniCodeUrl);
  if (host === 'costumeoclock.com') return new CostumeoclockCrawler(uniCodeUrl);
  if (host === 'suare.co.kr') return new SuareCrawler(uniCodeUrl);
  if (host === 'hance.kr') return new HanceCrawler(uniCodeUrl);
  if (host === 'maison-mined.com') return new MaisonMinedCrawler(url);
  if (host === 'advisory.co.kr') return new AdvisoryCrawler(url);
  if (host === 'modnine.com') return new ModnineCrawler(url);
  if (host === 'currentstore.co.kr') return new CurrentCrawler(url);
  if (host === 'pavement.co.kr') return new PavementCrawler(url);
  if (host === 'partsstore.kr') return new PartsCrawler(url);
  if (host === 'flareup.co.kr') return new FlareupCrawler(url);
  if (host === 'haleineshop.com') return new HaleineCrawler(url);
  if (host === 'phos333.com') return new Phos333Crawler(url);
  if (host === 'waze8690s.cafe24.com') return new WazeCralwer(url);
  if (host === 'massnoun.com') return new MassnounCrawler(url);
  if (host === 'rdvz.kr') return new RdvzCrawler(url);
  if (host === 'nomanual-official.com') return new NomanualCrawler(url);

  return null;
};

export const getCafe24Data = async (
  url,
  evaluate,
  productNum
): Promise<evaluateResponse> => {
  const data = await pool.use(async (instance) => {
    const page = await instance.createPage();
    await page.clearCookies();
    await page.open(url);
    const result = await page.evaluate(evaluate, productNum);
    await page.close();
    return Promise.resolve(result as evaluateResponse);
  });
  return Promise.resolve(data as evaluateResponse);
};
