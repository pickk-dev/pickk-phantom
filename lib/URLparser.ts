export const getProductNum = (url: string): number => {
  const sumin = Number(
    new URL(url).searchParams.get("product_no") || url.split("/")[5]
  );
  return sumin;
};
