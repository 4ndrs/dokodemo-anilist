browser.contextMenus.create({
  id: "dokodemo-search",
  title: "Search Dokodemo Anilist",
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "dokodemo-search" && typeof tab?.id === "number") {
    browser.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["content/styles.css"],
    });

    browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content/dokodemo-anilist.js"],
    });
  }
});

browser.runtime.onMessage.addListener((message, sender) => {
  if (message !== "SHUT IT DOWN!!" || typeof sender.tab?.id !== "number") {
    return;
  }

  console.log("got shut it down message");

  browser.scripting.removeCSS({
    target: { tabId: sender.tab.id },
    files: ["content/styles.css"],
  });
});
