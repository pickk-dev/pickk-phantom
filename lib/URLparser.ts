export const getProductNum = (url: string): number => {
  const sumin = Number(
    new URL(url).searchParams.get('product_no') || url.split('/')[5]
  );
  return sumin;
};

export const parseHostName = (hostname: string): string => {
  if (hostname.includes('topten10mall.com')) {
    return 'topten10mall.com';
  }

  return hostname.replace('www.', '');
};
