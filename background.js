chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get({ enabled: true }, (data) => {
      const newStatus = !data.enabled;
      chrome.storage.sync.set({ enabled: newStatus }, () => {
        const message = newStatus ? 'enabled' : 'disabled';
        chrome.action.setIcon({
          path: newStatus ? {
            "16": "icons/Just-enough-light-16.png",
            "48": "icons/Just-enough-light-48.png",
            "128": "icons/Just-enough-light-128.png"
          } : {
            "16": "icons/disable-16.png",
            "48": "icons/disable-48.png",
            "128": "icons/disable-128.png"
          }
        });
        chrome.tabs.sendMessage(tab.id, { action: newStatus ? 'enable' : 'disable' });
      });
    });
  });