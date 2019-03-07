if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const cfg = {};

//  Refresh time between request to get the Public IP changes, in seconds.
//  Between 2 and 20 seconds
cfg.ipRefreshTime = 5000;

SAGEM3304.cfg = cfg;
