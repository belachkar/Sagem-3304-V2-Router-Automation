if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const actions = {};

actions.enableIcon = (tabId, badgeText) => {
  chrome.browserAction.enable(tabId);
  chrome.browserAction.setBadgeText({
    text: badgeText,
    tabId: tabId
  });
};

actions.disableIcon = (tabId) => {
  chrome.browserAction.disable(tabId);
  chrome.browserAction.setBadgeText({
    text: '',
    tabId: tabId
  });
};

SAGEM3304.actions = actions;
// export { enableIcon, disableIcon };
