if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const utils = {};

utils.querystring =  {};

utils.querystring.stringify = function (obj, sep = '&', eq = '=') {
  const escape = encodeURIComponent;
  const qs = [];
  let key = null;

  for (key in obj) if (obj.hasOwnProperty(key)) {
    qs.push(escape(key) + eq + escape(String(obj[key])));
  }
  return qs.join(sep);
};

SAGEM3304.utils = utils;
// export { querystring };
