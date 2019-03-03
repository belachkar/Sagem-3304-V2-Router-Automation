const querystring=  {};

querystring.stringify = function (obj, sep = '&', eq = '=') {
  const escape = encodeURIComponent;
  const qs = [];
  let key = null;

  for (key in obj) if (obj.hasOwnProperty(key)) {
    qs.push(escape(key) + eq + escape(String(obj[key])));
  }
  return qs.join(sep);
};

// export { querystring };
