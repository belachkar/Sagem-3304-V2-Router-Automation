const enableIcon = (tabId, badgeText) => {
  chrome.browserAction.enable(tabId);
  chrome.browserAction.setBadgeText({
    text: badgeText,
    tabId: tabId
  });
};

const disableIcon = (tabId) => {
  chrome.browserAction.disable(tabId);
  chrome.browserAction.setBadgeText({
    text: '',
    tabId: tabId
  });
};

// export { enableIcon, disableIcon };
