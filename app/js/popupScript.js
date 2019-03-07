if (typeof SAGEM3304 === 'undefined') SAGEM3304 = {};

const popup = {};

console.log('POPUP SCRIPT LOADED');

popup.messages = SAGEM3304.messages.messages;
popup.sendMsg = SAGEM3304.messages.sendMsg;

popup.run = () => {
  console.log('POPUP SCRIPT RUN');

  $('#btnReinitADSL').click(() => popup.sendMsg({ message: popup.messages.REINITADSL }));
  $('#btnRebootRouter').click(() => popup.sendMsg({ message: popup.messages.REBOOTROUTER }));

  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
    const msg = message.message;

    switch (msg) {
    case popup.messages.LOCALIP:
      $('#tdLocalIP').text(message['ip']);
      break;
    case popup.messages.PUBLICIP:
      $('#tdPublicIP').text(message['ip']);
      break;
    default:
      console.error('Message received not handled', message);
      break;
    }
  });
  popup.sendMsg({ message: popup.messages.POPUPREADY });
};

SAGEM3304.popup = popup;
SAGEM3304.popup.run();
