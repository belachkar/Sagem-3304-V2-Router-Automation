if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const hashPass = {};

// Sagem Script
hashPass.hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
hashPass.chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

hashPass.hex_md5 = (s) => { 
  return hashPass.binl2hex(hashPass.core_md5(hashPass.str2binl(s), s.length * hashPass.chrsz));
};

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
hashPass.core_md5 = (x, len) => {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
 
    a = hashPass.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = hashPass.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = hashPass.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = hashPass.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = hashPass.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = hashPass.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = hashPass.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = hashPass.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = hashPass.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = hashPass.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = hashPass.md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = hashPass.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = hashPass.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = hashPass.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = hashPass.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = hashPass.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = hashPass.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = hashPass.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = hashPass.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = hashPass.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = hashPass.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = hashPass.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = hashPass.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = hashPass.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = hashPass.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = hashPass.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = hashPass.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = hashPass.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = hashPass.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = hashPass.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = hashPass.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = hashPass.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = hashPass.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hashPass.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hashPass.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hashPass.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hashPass.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hashPass.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hashPass.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hashPass.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hashPass.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hashPass.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hashPass.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hashPass.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hashPass.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hashPass.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hashPass.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hashPass.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = hashPass.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = hashPass.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = hashPass.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = hashPass.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = hashPass.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = hashPass.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = hashPass.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = hashPass.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = hashPass.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = hashPass.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = hashPass.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = hashPass.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = hashPass.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = hashPass.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = hashPass.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = hashPass.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = hashPass.safe_add(a, olda);
    b = hashPass.safe_add(b, oldb);
    c = hashPass.safe_add(c, oldc);
    d = hashPass.safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
};

/*
 * These functions implement the four basic operations the algorithm uses.
 */
hashPass.md5_cmn = (q, a, b, x, s, t) => {
  return hashPass.safe_add(hashPass.bit_rol(hashPass.safe_add(hashPass.safe_add(a, q), hashPass.safe_add(x, t)), s),b);
};
hashPass.md5_ff = (a, b, c, d, x, s, t) => {
  return hashPass.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
};
hashPass.md5_gg = (a, b, c, d, x, s, t) => {
  return hashPass.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
};
hashPass.md5_hh = (a, b, c, d, x, s, t) => {
  return hashPass.md5_cmn(b ^ c ^ d, a, b, x, s, t);
};
hashPass.md5_ii = (a, b, c, d, x, s, t) => {
  return hashPass.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
};

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
hashPass.safe_add = (x, y) => {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

/*
 * Bitwise rotate a 32-bit number to the left.
 */
hashPass.bit_rol = (num, cnt) => {
  return (num << cnt) | (num >>> (32 - cnt));
};

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
hashPass.str2binl = (str) => {
  var bin = Array();
  var mask = (1 << hashPass.chrsz) - 1;
  for(var i = 0; i < str.length * hashPass.chrsz; i += hashPass.chrsz)
    bin[i>>5] |= (str.charCodeAt(i / hashPass.chrsz) & mask) << (i%32);
  return bin;
};

/*
 * Convert an array of little-endian words to a hex string.
 */
hashPass.binl2hex = (binarray) => {
  var hex_tab = hashPass.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
  var str = '';
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
};

SAGEM3304.hashPass = hashPass;
