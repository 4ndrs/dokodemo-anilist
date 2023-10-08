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
