export const _thesortiecom = () => {
  const optionPriceVariants = [];
  const productPriceVariants = [];

  const values = {};
  const isSoldout = [];

  const optionNames = [];

  // polyfill for NodeList.forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach as any;
  }

  document.querySelectorAll('#prod_options div.option_title').forEach((ele) => {
    const optionName = ele.textContent.replace('*', '').trim();

    optionNames.push(optionName);
    values[optionName] = [];
  });

  document
    .querySelectorAll('#prod_options > div.row > div > div > select')
    .forEach((selectEle, selectIndex) => {
      selectEle.querySelectorAll('option').forEach((ele, index) => {
        if (index === 0) {
          return;
        }
        const optionValue = ele.textContent;
        values[optionNames[selectIndex]].push(optionValue);
        if (ele.outerHTML.includes('disabled')) {
          isSoldout.push([index - 1]);
        }
      });
    });

  return {
    values,
    isSoldout,
    optionPriceVariants,
    productPriceVariants,
  };
};
