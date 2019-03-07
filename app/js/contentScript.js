/**
 * Created by Belachkar ali 21//02/2019
 */
if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const cs = {};

console.log('CONTENT SCRIPT LOADED');

cs.handleError = SAGEM3304.handlers.errors;
cs.messages = SAGEM3304.messages.messages;
cs.sendMsg = SAGEM3304.messages.sendMsg;

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

cs.run = () => {
  console.log('CONTENT SCRIPT RUN');

  cs.findIP
    .then((ip) => {
      console.log('Your local IP: ', ip);
      cs.sendMsg({message: cs.messages.LOCALIP, ip});
    })
    .catch(cs.handleError);
  
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
    const msg = message.message;

  
    switch (msg) {
    case cs.messages.PUBLICIPCHANGED:
      console.log('Public IP changed:', message.ip);
      toastNow({
        message: `IP Changed: ${message.ip}`,
        time: 3000,
        outerStyles:{
          background:'#343434'
        },
        innerStyles:{
          color:'#cdff6c',
          'padding-bottom': '2px'
        }
      });
      break;
    default:
      console.error('Message received not handled', message);
      break;
    }
  });
};

SAGEM3304.cs = cs;
SAGEM3304.cs.run();

