browser.runtime.onMessage.addListener((message, sender) => {
  if (!message || message.type !== "openMeet" || typeof message.url !== "string") return;
  return browser.runtime.sendNativeMessage("application.id", message).then(async (response) => {
    if (!response || !response.ok || message.closeTab !== true) return response;
    if (!sender.tab || !Number.isInteger(sender.tab.id) ||
        (sender.frameId !== undefined && sender.frameId !== 0)) return {...response, closed: false};
    try {
      const tab = await browser.tabs.get(sender.tab.id);
      if (tab.url !== message.url) return {...response, closed: false};
      await browser.tabs.remove(sender.tab.id);
      return {...response, closed: true};
    } catch (_) {
      return {...response, closed: false};
    }
  }).catch(() => ({ok: false}));
});
