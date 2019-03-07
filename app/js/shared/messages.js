if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const messages = {};

messages.messages = {
  REINITADSL: 'Reinitialize Connection ADSL',
  POPUPREADY: 'Popup Script Ready',
  REBOOTROUTER: 'Reboot Router',
  LOCALIP: 'Get Local IP',
  PUBLICIP: 'Get Public IP',
  PUBLICIPCHANGED: 'Get Public IP Changed',
};

messages.sendMsg = (msgObj) => {
  chrome.runtime.sendMessage(msgObj);
};

messages.sendMsgTab = (tabId, msgObj) => {
  chrome.tabs.sendMessage(tabId, msgObj);
};

SAGEM3304.messages = messages;
