/**
 * Created by Belachkar ali 21//02/2019
 */

$(function() {
  console.log('CONTENT SCRIPT');

  const findIP = new Promise((r) => {
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
  
  findIP.then((ip) => console.log('Your local IP: ', ip)).catch((e) => console.error(e));

});
