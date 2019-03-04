$(function() {
  console.log('POPUP SCRIPT');

  const messages = {
    reinitADSL: 'Reinitialize Connection ADSL',
    rebootRouter: 'Reboot Router',
  };

  $('#btnReinitADSL').click(() => {
    chrome.runtime.sendMessage({ message: 'Reinitialize Connection ADSL' }, (response) => {
      console.log(response);
    });
  });
  $('#btnRebootRouter').click(() => {
    chrome.runtime.sendMessage({ message: 'Reboot Router' }, (response) => {
      console.log(response);
    });
  });
  chrome.runtime.onMessage.addListener((req, sender, res) => {
    // const from = sender && sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension';
    console.log(sender);
    console.log(req);
  });
});
