// import { disableIcon, enableIcon } from '../lib/actions';
// import { messages } from '../lib/messages';

// chrome.browserAction.disable();
console.log('BACKGROUND SCRIPT');

chrome.runtime.onMessage.addListener(function(message, sender, response) {
  // const tabId = sender.tab.id;
  const msg = message.message;
  console.log(message);
  switch (msg) {
  case 'Reinitialize Connection ADSL':
    reinitADSL()
      .then(() => response({message: 'Reinitialisation success'}))
      .catch(handleError);
    break;
  case 'Reboot Router':
    rebootRouter()
      .then(() => response({message: 'Reboot success'}))
      .catch(handleError);
    break;
  default:
    break;
  }
  return true;
});

chrome.browserAction.onClicked.addListener(function(srcTab) {
  // chrome.tabs.sendMessage(srcTab.id, { msg: messages.sendLink }, function(response) {
  //   const { url } = response;
  //   if (url !== undefined) {
  //     chrome.tabs.create({ index: srcTab.index, url }, function(tab) {
  //       setTimeout(function() {
  //         chrome.tabs.remove(tab.id);
  //       }, 5000);
  //     });
  //   }
  // });
});
