$(function() {
  console.log('POPUP SCRIPT');

  const messages = {
    reinitADSL: 'Reinitialize Connection ADSL',
    rebootRouter: 'Reboot Router',
  };

  $('#btnReinitADSL').click(() => {
    chrome.runtime.sendMessage({ message: messages['reinitADSL'] }, (response) => {
      console.log(response);
    });
  });
  $('#btnRebootRouter').click(() => {
    chrome.runtime.sendMessage({ message: messages['rebootRouter'] }, (response) => {
      console.log(response);
    });
  });
  chrome.runtime.onMessage.addListener((req, sender, res) => {
    // const from = sender && sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension';
    console.log(sender);
    console.log(req);
  });
});
