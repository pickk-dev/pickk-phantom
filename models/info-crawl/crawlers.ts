export const _29cmcokr = () => {
  const { innerHTML } = document.body;

  const select = (startText, endText, startIndex?) => {
    const start = innerHTML.indexOf(startText, startIndex) + startText.length;
    const end = innerHTML.indexOf(endText, start);
    return innerHTML.slice(start, end);
  };

  let originalPrice = select(
    '<!----><div _ngcontent-c33="" class="o">\n                    <span _ngcontent-c33="" class="num">',
    '</span>',
    0
  );
  let salePrice = select(
    '%</span> ',
    '<em _ngcontent-c33="" class="unit">원</em></span>',
    innerHTML.indexOf(
      '<span _ngcontent-c33="" class="num"><span _ngcontent-c33="">'
    )
  );
  if (
    innerHTML.indexOf(
      '<!----><div _ngcontent-c33="" class="o">\n                    <span _ngcontent-c33="" class="num">',
      0
    ) === -1
  ) {
    originalPrice = select(
      '<!----><div _ngcontent-c33="" class="p">\n                    <span _ngcontent-c33="" class="num">',
      '<em',
      0
    );
    salePrice = '0';
  }

  const name = select('<div _ngcontent-c33="" class="name">', '</div>')
    .trim()
    .slice(7);

  const imageElement = document.querySelectorAll(
    'body > ui-root > div > section > ui-item > div > div.detail_cnt_wrap > ui-detail-item > div > div.item_img_view > div > ruler-swiper-container > div > div.swiper-container > div > ruler-swiper-slide > div > div > ruler-blazy > img'
  )[0] as HTMLImageElement;

  return {
    name: name.slice(
      name.indexOf('</span>') > 0 ? name.indexOf('</span>') + 7 : 0
    ),
    imageUrl:
      imageElement.attributes.getNamedItem('data-blazy').value ||
      imageElement.src,
    brandKor: select('<h1 _ngcontent-c37="" class="kor">', '</h1>'),
    originalPrice,
    salePrice,
  };
};

export const _hivercokr = () => {
  const name = (document.getElementsByClassName(
    'detail_title'
  )[0] as HTMLDivElement).textContent;
  const brandKor = (document.getElementsByClassName('list_store_title')[0]
    .children[0] as HTMLAnchorElement).text;
  const imageUrl = (document.getElementById('imageGallery').children[
    document.getElementById('imageGallery').children.length > 1 ? 1 : 0
  ].children[0] as HTMLImageElement).src;
  let salePrice = (document.getElementsByClassName(
    'detail_price'
  )[0] as HTMLDivElement).textContent;
  let originalPrice = salePrice;
  if (salePrice.indexOf('%') > -1) {
    const { innerHTML } = document.getElementsByClassName('detail_price')[0];
    salePrice = innerHTML.slice(
      innerHTML.indexOf('</b>'),
      innerHTML.indexOf('<span')
    );
    originalPrice = document.getElementsByClassName('detail_price')[0]
      .children[1].innerHTML;
  }

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _ssfshopcom = () => {
  const brands = {
    '8seconds': '에잇세컨즈',
    Beanpole: '빈폴',
    'Beanpole Accessory': '빈폴 악세사리',
    'Beanpole Golf': '빈폴 골프',
    'Beanpole Kids': '빈폴 키즈',
    'Beanpole Ladies': '빈폴 레이디스',
    'Beanpole Men': '빈폴 맨',
    'Beanpole Sport': '빈폴 스포츠',
    Galaxy: '갤럭시',
    'Galaxy Lifestyle': '갤럭시 라이프스타일',
    HEARTIST: '하티스트',
    'Juun.j': '준지',
    KUHO: '쿠호',
    'kuho plus': '쿠호 플러스',
    LEBEIGE: '르베이지',
    MELISSA: '멜리사',
    MVIO: '엠비오',
    OIAUER: '오이아우어',
    Rogatis: '로가디스',
    '10 Corso Como': '10 꼬르소 꼬모',
    ami: '아미',
    Aspesi: '아스페시',
    Auralee: '아우라리',
    'BAO BAO ISSEY MIYAKE': '바오 바오 이세이 미야케',
    'Barena Venezia': '바레나 베네치아',
    BROOKS: '부룩스',
    'CANADA GOOSE': '캐나다 구스',
    Danton: '단톤',
    GRANIT: '그라니트',
    'Helmut Lang': '헬무트 랭',
    'James Perse': '제임스 퍼스',
    Lansmere: '란스미어',
    'Maison Kitsuné': '메종 키츠네',
    'PLEATS PLEASE ISSEY MIYAKE': '플리츠 플리즈 이세이 미야케',
    'Rag & Bone': '랙앤본',
    'RICK OWENS': '릭 오웬스',
    Spalwart: '스파워트',
    'Studio Nicholson': '스튜디오 니콜슨',
    SUITSUPPLY: '수트서플라이',
    Theory: '띠어리',
    'Tory Burch': '토리 버치',
    'PLAY COMME des GARCONS': '플레이 꼼데 가르송',
  };
  const name = (document.getElementById('goodDtlTitle') as HTMLHeadingElement)
    .innerText;
  const brandKor =
    brands[
      (document.getElementsByClassName('brand')[0]
        .children[0] as HTMLAnchorElement).text
        .split('>')[0]
        .trim()
    ];
  const imageUrl = (document.getElementsByClassName('lslide')[0].children[0]
    .children[0] as HTMLImageElement).src;
  let priceList = (document.getElementsByClassName(
    'price'
  )[0] as HTMLDivElement).innerText.split(/ | /);
  let salePrice = priceList[0];
  let originalPrice = priceList[1] || salePrice;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _matchesfashioncom = () => {
  const name = (document.getElementsByClassName(
    'pdp-description'
  )[0] as HTMLSpanElement).innerText.trim();
  const brandKor = (document.getElementById('breadcrumb').children[0]
    .children[2].children[0] as HTMLAnchorElement).text.trim();
  const imageUrl = (document.getElementById('slick-slide00').children[0]
    .children[0].children[0] as HTMLImageElement).src;
  let priceList = (document.getElementsByClassName(
    'pdp-price'
  )[0] as HTMLParagraphElement).innerText.split(/₩|\//);
  let originalPrice = priceList[1].trim();
  let salePrice = priceList.length === 3 ? originalPrice : priceList[2].trim();
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _lfmallcokr = () => {
  const name = document
    .querySelector('meta[property="og:title"]')
    .getAttribute('content');
  const brandKor = document
    .querySelector('meta[name="keywords"]')
    .getAttribute('content')
    .split(',')[1];
  const imageUrl = document
    .querySelector('meta[property="og:image"]')
    .getAttribute('content');
  let originalPrice = document
    .querySelector('meta[property="rb:originalPrice"]')
    .getAttribute('content');
  let salePrice = document
    .querySelector('meta[property="rb:salePrice"]')
    .getAttribute('content');
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _onthelookcokr = () => {
  const name = (document.getElementsByClassName(
    'sc-jdfcpN'
  )[0] as HTMLDivElement).innerText;
  const brandKor = (document.getElementsByClassName(
    'sc-bIqbHp'
  )[0] as HTMLDivElement).innerText;
  const imageUrl = (document.getElementsByClassName(
    'sc-fkyLDJ'
  )[0] as HTMLImageElement).src;
  const originalPrice = (document.getElementsByClassName('sc-hMrMfs')[0]
    .children[0] as HTMLDivElement).innerText;
  const salePrice = (document.getElementsByClassName('sc-eopZyb')[0]
    .children[0] as HTMLDivElement).innerText;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _lookpincokr = () => {
  const name = (document.getElementsByClassName(
    'ProductDetailMobile_title__373rx'
  )[0] as HTMLSpanElement).innerText;
  const brandKor = (document.getElementsByClassName(
    'StoreRowWithBookmark_name__rw46l'
  )[0] as HTMLSpanElement).innerText;
  const imageUrl = (document.getElementsByClassName(
    'ProductDetailMobile_image__gmU9K'
  )[0] as HTMLImageElement).src;
  const salePrice = (document.getElementsByClassName(
    'ProductDetailMobile_price__3RGzV'
  )[0] as HTMLSpanElement).innerText;
  const originalPrice =
    document.getElementsByClassName(
      'ProductDetailMobile_prevPrice__3huws'
    )[0] === undefined
      ? salePrice
      : (document.getElementsByClassName(
          'ProductDetailMobile_prevPrice__3huws'
        )[0] as HTMLSpanElement).innerText;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _g9cokr = () => {
  const name = (document.getElementById('subjText4') as HTMLElement).innerText;
  const brandKor = (document.getElementById('subjText3') as HTMLSpanElement)
    .innerText;
  const imageUrl = (document.getElementById('goodsImage') as HTMLImageElement)
    .src;
  const originalPrice = (document.getElementById('subjText4') as HTMLElement)
    .innerText;
  const salePrice = originalPrice;
  return { name, brandKor, imageUrl, salePrice, originalPrice };
};

export const _kolonmallcom = () => {
  const name = (document.querySelector(
    'div.info-group > form > div.title'
  ) as HTMLDivElement).textContent;

  const title = (document.querySelector('title') as HTMLTitleElement)
    .textContent;
  const brandKor = title.slice(title.indexOf('_') + 1).trim();
  const imageUrl = (document.querySelector(
    '#kolon-content > article > div.head-info-wrap > div.thumb-group > div.thumb.swiper-container.swiper-container-initialized.swiper-container-horizontal > div.swiper-wrapper > div > div > img.base'
  ) as HTMLImageElement).src;
  let salePrice =
    document.querySelector('div.info-group > form > div.price > strong')
      ?.textContent || '0';
  let originalPrice =
    document.querySelector('div.info-group > form > div.price > del')
      ?.textContent || '0';

  return { name, brandKor, imageUrl, salePrice, originalPrice };
};
