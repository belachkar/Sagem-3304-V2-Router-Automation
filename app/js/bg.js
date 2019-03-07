if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const bg = {};
console.log('BACKGROUND SCRIPT LOADED');

bg.ipRefreshTime = SAGEM3304.cfg.ipRefreshTime;
bg.urlIPApi = SAGEM3304.vars.urlIPApi;
bg.reinitADSL = SAGEM3304.app.reinitADSL;
bg.rebootRouter = SAGEM3304.app.rebootRouter;
bg.handleError = SAGEM3304.handlers.errors;
bg.messages = SAGEM3304.messages.messages;
bg.sendMsg = SAGEM3304.messages.sendMsg;
bg.sendMsgTab = SAGEM3304.messages.sendMsgTab;

bg.localIP = null;
bg.publicIP = null;

bg.sendLocalIP = () => bg.sendMsg({message: bg.messages.LOCALIP, ip: bg.localIP});
bg.sendPublicIP = () => bg.sendMsg({message: bg.messages.PUBLICIP, ip: bg.publicIP});
bg.sendPublicIPNotification = (tabId) => bg.sendMsgTab(tabId, {message: bg.messages.PUBLICIPCHANGED, ip: bg.publicIP});

bg.getActiveTabId = (callback) => {
  chrome.tabs.query({active: true}, tabs => {
    const tab = tabs && tabs.length > 0 ? tabs[0] : null;
    if (tab && tab.id) {
      callback(tab.id);
    }
  });
};

bg.refreshPublicIP = () => {
  fetch(bg.urlIPApi)
    .then(res => res.json())
    .then(res => {
      const ip = res.ip;
      if (bg.publicIP && bg.publicIP !== ip) {
        bg.publicIP = ip;
        console.log('IP public address changed:', ip);
        bg.updatePopupView();
        // bg.sendPublicIPNotification();
      }
    })
    .catch(bg.handleError);
};

bg.updatePopupView = () => {
  const popupActiveScriptsNbr = chrome.extension.getViews({type: 'popup'}).length;
  console.log('POPUP scripts active: ', popupActiveScriptsNbr);
  if (popupActiveScriptsNbr > 0) {
    if (bg.localIP) bg.sendLocalIP();
    if (bg.publicIP) bg.sendPublicIP();
  }
};

bg.run = () => {
  console.log('BACKGROUND SCRIPT RUN');

  bg.getActiveTabId((tabId) => bg.sendPublicIPNotification(tabId));

  chrome.runtime.onMessage.addListener((message) => {
    const msg = message.message;
    console.log(message);
    switch (msg) {
    case bg.messages.REINITADSL:
      bg.reinitADSL()
        .then(() => console.log('Reinitialisation success'))
        .catch(bg.handleError);
      break;
    case bg.messages.REBOOTROUTER:
      bg.rebootRouter()
        .then(() => console.log({message: 'Reboot success'}))
        .catch(bg.handleError);
      break;
    case bg.messages.LOCALIP:
      bg.localIP = message['ip'] ? message['ip'] : bg.localIP;
      break;
    case bg.messages.POPUPREADY:
      bg.updatePopupView();
      break;
    default:
      console.error('Message received not handled', message);
      break;
    }
  });

  setInterval(() => {
    bg.refreshPublicIP();
  }, bg.ipRefreshTime);
};

SAGEM3304.bg = bg;
SAGEM3304.bg.run();
