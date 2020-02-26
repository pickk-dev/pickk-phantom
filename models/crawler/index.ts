import { ICrawler } from '../../types/ICrawler';
import TheKnitCompanyCrawler from './the-knit-company';

export const getCrawler = (url: string): ICrawler => {
  const { origin } = new URL(url);
  if (origin === 'https://theknitcompany.com')
    return new TheKnitCompanyCrawler(url);
};
