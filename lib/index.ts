export * from './Cafe24Parser';
export * from './Phantom';
export * from './URLparser';
export * from './InfoCrawler';

import request from 'request';
import charset from 'charset'; // 해당 사이트의 charset값을 알 수 있게 해준다.
import { decode } from 'iconv-lite';
import axios from 'axios';

export const requestHtml = async (sourceUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: sourceUrl, // 원하는 url값을 입력
        encoding: null, // 해당 값을 null로 해주어야 제대로 iconv가 제대로 decode 해준다.
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Yeti/1.1; +http://naver.me/spd)', //            ''Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        },
      },
      async (error, res, body) => {
        if (!error && res.statusCode === 200 && body.length > 1000) {
          const enc = charset(res.headers, body); // 해당 사이트의 charset값을 획득
          const iResult = decode(body, enc || 'utf-8'); // 획득한 charset값으로 body를 디코딩
          resolve(iResult);
        } else {
          const { data } = await axios.get(sourceUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (compatible; Yeti/1.1; +http://naver.me/spd)',
            },
          });
          resolve(data);
        }
      }
    );
  });
};
