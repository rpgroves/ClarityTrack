chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  console.log("Active tab:", tab.title, tab.url);

  // Save to Chrome storage
  chrome.storage.local.get(["tabHistory"], (result) => {
    const history = result.tabHistory || [];
    history.push({ title: tab.title, url: tab.url, time: Date.now() });
    chrome.storage.local.set({ tabHistory: history });
  });
});
