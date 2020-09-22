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

export const _ssfshopcom = () => {
  const optionPriceVariants = [];
  const productPriceVariants = [];

  let values = {};
  const isSoldout = [];

  const optionNames = [];

  // polyfill for NodeList.forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach as any;
  }

  document
    .querySelectorAll(
      '#prdInfoOptionArea > div.select > a > label.box > em.default'
    )
    .forEach((ele) => {
      const optionName = ele.textContent.replace('*', '').trim();

      optionNames.push(optionName);
      values[optionName] = [];
    });

  if (optionNames.length === 0) {
    optionNames.push('사이즈');
    values['사이즈'] = [];
  }

  document
    .querySelectorAll('#prdInfoOptionArea div.option ul')
    .forEach((selectEle, selectIndex) => {
      selectEle.querySelectorAll('li:not(.group)').forEach((ele, index) => {
        try {
          const optionValue =
            ele.getAttribute('itmnm') ||
            ele.querySelector('a > em').textContent;
          values[optionNames[selectIndex]].push(optionValue);
        } catch {}
        const optionId = ele.getAttribute('sizeitmno');
      });
    });

  if (values[optionNames[0]].length === 0) {
    document
      .querySelectorAll('div.data_size > table > tbody > tr:first-child')
      .forEach((selectEle, selectIndex) => {
        selectEle.querySelectorAll('td > span').forEach((ele, index) => {
          try {
            const optionValue = ele.textContent;
            values[optionNames[selectIndex]].push(optionValue);
            const optionId = ele.getAttribute('sizeitmno');
          } catch {}
        });
      });
  }

  document
    .querySelectorAll('#prdInfoOptionArea > div.select > div.option > ul')
    .forEach((selectEle, selectIndex) => {
      selectEle.querySelectorAll('li').forEach((ele, index) => {
        if (index === 0) {
          return;
        }
        const optionId = ele.getAttribute('sizeitmno') || ele.id.slice(2);
        const elementId = 'sizeItmNo' + optionId;

        if (
          document
            .getElementById(elementId)
            .getAttribute('onlineusefulinvqty') === '0'
        ) {
          const others = [...Array(values[optionNames[1 - selectIndex]])];

          if (optionNames.length === 1) {
            isSoldout.push([index - 1]);
          }

          if (selectIndex === 0) {
            isSoldout.push(others.map((other) => [index - 1, other]));
          }
          isSoldout.push(others.map((other) => [other, index - 1]));
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
