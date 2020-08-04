import { pool } from "../../lib/Phantom";

import { ICrawler, evaluateResponse } from "../../types/Crawl";
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
import CurrentCrawler from "./current";
import PavementCrawler from "./pavement";
import PartsCrawler from "./parts";
import FlareupCrawler from "./flareup";
import HaleineCrawler from "./haleine";
import Phos333Crawler from "./phos333";
import WazeCralwer from "./waze";
import MassnounCrawler from "./massnoun";
import RdvzCrawler from "./rdvz";
import NomanualCrawler from "./nomanual";
import JosephtCrawler from "./josepht";
import EsnCrawler from "./esn";
import AddoffCrawler from "./addoff";
import OohAhhCrawler from "./oohahh";
import TheBurningCralwer from "./the-burning";
import BeyondClosetCralwer from "./beyond-closet";
import ToffeeCrawler from "./toffee";
import CompagnoCrawler from "./compagno";
import { parseHostName } from "../../lib";
import AspivotCrawler from "./aspivot";
import KutletshopCrawler from "./kutletshop";
import BalluteCrawler from "./ballute";
import WzustudioCrawler from "./wuzustudio";
import OjosCrawler from "./ojos";
import AmesWorldwideCrawler from "./ames-worldwide";
import MillionCorCrawler from "./millioncor";
import LetterFromMoonCrawler from "./letterfrommoon";
import OddoneoutCrawler from "./oddoneout";
import RoccirocciCrawler from "./roccirocci";
import CharmsCrawler from "./charms";
import BibyseobCrawler from "./bibyseob";
import DenmadeCrawler from "./denmade";
import FanacultCrawler from "./fanacult";
import NordstudioCrawler from "./nordstudio";
import KingArchivesCrawler from "./king-archives";
import _13MonthCrawler from "./13month";
import AqostudiospaceCrawler from "./aqostudiospace";
import FuzaCrawler from "./fuza";
import MongdolCrawler from "./mongdol";
import EaseCrawler from "./ease";
import InrowsCrawler from "./inrows";
import LuoespacCrawler from "./luoespac";
import EsfaiCrawler from "./esfai";
import JuanHommeCrawler from "./juan-homme";
import OurscopeCrawler from "./ourscope";
import MimthewardrobeCrawler from "./mimthewardrobe";
import DgreCrawler from "./dgre";

export const getCrawler = (url: string): ICrawler => {
  const uniCodeUrl = encodeURI(url);

  const host = parseHostName(new URL(uniCodeUrl).hostname);

  if (host === "theknitcompany.com")
    return new TheKnitCompanyCrawler(uniCodeUrl);
  if (host === "garment-lable.com") return new GarmentLableCrawler(uniCodeUrl);
  if (host === "86road.co.kr") return new EightySixRoadCrawler(uniCodeUrl);
  if (host === "fatalism.co.kr") return new FatalismCrawler(uniCodeUrl);
  if (host === "piece-worker.com") return new PieceWorkerCrawler(uniCodeUrl);
  if (host === "bananafit.co.kr") return new BananafitCrawler(uniCodeUrl);
  if (host === "belier.co.kr") return new BelierCrawler(uniCodeUrl);
  if (host === "lohnt.co.kr") return new LohntCrawler(uniCodeUrl);
  if (host === "romanticmove.com") return new RomanticMoveCrawler(uniCodeUrl);
  if (host === "notnnot.com") return new NotnnotCrawler(uniCodeUrl);
  if (host === "costumeoclock.com") return new CostumeoclockCrawler(uniCodeUrl);
  if (host === "suare.co.kr") return new SuareCrawler(uniCodeUrl);
  if (host === "hance.kr") return new HanceCrawler(uniCodeUrl);
  if (host === "maison-mined.com") return new MaisonMinedCrawler(url);
  if (host === "advisory.co.kr") return new AdvisoryCrawler(url);
  if (host === "modnine.com") return new ModnineCrawler(url);
  if (host === "currentstore.co.kr") return new CurrentCrawler(url);
  if (host === "pavement.co.kr") return new PavementCrawler(url);
  if (host === "partsstore.kr") return new PartsCrawler(url);
  if (host === "flareup.co.kr") return new FlareupCrawler(url);
  if (host === "haleineshop.com") return new HaleineCrawler(url);
  if (host === "phos333.com") return new Phos333Crawler(url);
  if (host === "waze8690s.cafe24.com") return new WazeCralwer(url);
  if (host === "massnoun.com") return new MassnounCrawler(url);
  if (host === "rdvz.kr") return new RdvzCrawler(url);
  if (host === "nomanual-official.com") return new NomanualCrawler(url);
  if (host === "josepht.co.kr") return new JosephtCrawler(url);
  if (host === "esnocturne.com") return new EsnCrawler(url);
  if (host === "addoff.co.kr") return new AddoffCrawler(uniCodeUrl);
  if (host === "oohahh.co.kr") return new OohAhhCrawler(uniCodeUrl);
  if (host === "the-burning.co.kr") return new TheBurningCralwer(uniCodeUrl);
  if (host === "beyondcloset.com") return new BeyondClosetCralwer(uniCodeUrl);
  if (host === "toffee.co.kr") return new ToffeeCrawler(uniCodeUrl);
  if (host === "compagno.co.kr") return new CompagnoCrawler(uniCodeUrl);
  if (host === "aspivot.com") return new AspivotCrawler(uniCodeUrl);
  if (host === "kutletshop.com") return new KutletshopCrawler(uniCodeUrl);
  if (host === "ballute.co.kr") return new BalluteCrawler(uniCodeUrl);
  if (host === "wuzustudio.com") return new WzustudioCrawler(uniCodeUrl);
  if (host === "ojos.kr") return new OjosCrawler(uniCodeUrl);
  if (host === "ames-worldwide.com")
    return new AmesWorldwideCrawler(uniCodeUrl);
  if (host === "millioncor.com") return new MillionCorCrawler(uniCodeUrl);
  if (host === "letterfrommoon.com")
    return new LetterFromMoonCrawler(uniCodeUrl);
  if (host === "oddoneout.co.kr") return new OddoneoutCrawler(uniCodeUrl);
  if (host === "roccirocci.com") return new RoccirocciCrawler(uniCodeUrl);
  if (host === "charms.kr") return new CharmsCrawler(uniCodeUrl);
  if (host === "bibyseob.kr") return new BibyseobCrawler(uniCodeUrl);
  if (host === "denmade.co.kr") return new DenmadeCrawler(uniCodeUrl);
  if (host === "fanacult.com") return new FanacultCrawler(uniCodeUrl);
  if (host === "nordstudio.co.kr") return new NordstudioCrawler(uniCodeUrl);
  if (host === "k-ing.kr") return new KingArchivesCrawler(uniCodeUrl);
  if (host === "13month.com") return new _13MonthCrawler(uniCodeUrl);
  if (host === "aqostudio.com") return new AqostudiospaceCrawler(uniCodeUrl);
  if (host === "fuza.world") return new FuzaCrawler(uniCodeUrl);
  if (host === "costumeoclock.com") return new MongdolCrawler(uniCodeUrl);
  if (host === "easestore.co.kr") return new EaseCrawler(uniCodeUrl);
  if (host === "inrows.co.kr") return new InrowsCrawler(uniCodeUrl);
  if (host === "luoespac.co.kr") return new LuoespacCrawler(uniCodeUrl);
  if (host === "esfai.co.kr") return new EsfaiCrawler(uniCodeUrl);
  if (uniCodeUrl.includes("smartstore.naver.com/juan_homme"))
    return new JuanHommeCrawler(uniCodeUrl);
  if (host === "ourscope.co.kr") return new OurscopeCrawler(uniCodeUrl);
  if (host === "mimthewardrobe.com")
    return new MimthewardrobeCrawler(uniCodeUrl);
  if (host === "dgre.co.kr") return new DgreCrawler(uniCodeUrl);

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
