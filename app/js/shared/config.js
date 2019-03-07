if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const cfg = {};

//  Refresh time between requests to detect the Public IP changes,
//  Must be in seconds, between 2 and 20 seconds.
cfg.ipRefreshRequestTime = 5;
cfg.toastIPNotification = {
  // time in secons
  time: 3
};

SAGEM3304.cfg = cfg;
