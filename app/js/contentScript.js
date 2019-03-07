if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const cs = {};

console.log('CONTENT SCRIPT LOADED');

cs.handleError = SAGEM3304.handlers.errors;
cs.messages = SAGEM3304.messages.messages;
cs.sendMsg = SAGEM3304.messages.sendMsg;
cs.toastIPNotification = SAGEM3304.cfg.toastIPNotification;

cs.findIP = new Promise((r) => {
  const w = window,
    a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }),
    b = () => {};
  a.createDataChannel('');
  a.createOffer((c) => a.setLocalDescription(c, b, b), b);
  a.onicecandidate = (c) => {
    try {
      c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
    } catch (e) {
      e => console.error(e.message);
    }
  };
});

var showNotification = function (message) {
  try {
    const docBody = document.getElementsByTagName('body')[0];
    const messageWrapper = document.createElement('div');
    const messageWrapperInner = document.createElement('span');
    messageWrapperInner.innerText = message;
    messageWrapperInner.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    messageWrapperInner.style.color = 'chartreuse';
    messageWrapperInner.style.fontSize = '16px';
    messageWrapperInner.style.fontWeight = '400';
    messageWrapperInner.style.lineHeight = '1.5';
    messageWrapper.style.position = 'fixed';
    messageWrapper.style.top = '2vh'; 
    messageWrapper.style.right = '4vh';
    messageWrapper.style.borderRadius = '4px';
    messageWrapper.style.width = '30vw';
    messageWrapper.style.textAlign = 'center';
    messageWrapper.style.paddingBottom = '4px';
    messageWrapper.style.backgroundColor = '#232323';
    messageWrapper.style.zIndex = '1009';
    messageWrapper.appendChild(messageWrapperInner);
    docBody.appendChild(messageWrapper);
    setTimeout(function () {
      docBody.removeChild(messageWrapper);
    }, cs.toastIPNotification.time * 1000 || 3000);
  } catch (e) {
    console.error('Toast Message Error: ', e.message);
  }
};

cs.startMsgListeners = () => {
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
    const msg = message.message;
  
    switch (msg) {
    case cs.messages.PUBLICIPCHANGED:
      if(message.ip) showNotification(`IP Changed: ${message.ip}`);
      break;
    default:
      console.error('Message received not handled', message);
      break;
    }
  });
};

cs.run = () => {
  console.log('CONTENT SCRIPT RUN');

  cs.findIP
    .then((ip) => {
      console.log('Your local IP: ', ip);
      cs.sendMsg({message: cs.messages.LOCALIP, ip});
    })
    .catch(cs.handleError);

  cs.startMsgListeners();
};

SAGEM3304.cs = cs;
SAGEM3304.cs.run();
