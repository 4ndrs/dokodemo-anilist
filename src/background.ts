import type {
  ActionResponse,
  ActionMessageSchema,
} from "./content/schema/message";

browser.contextMenus.create({
  id: "dokodemo-search",
  title: "Search Dokodemo Anilist",
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "dokodemo-search" || typeof tab?.id !== "number") {
    return;
  }

  try {
    const response = await browser.tabs.sendMessage(tab.id, {
      action: "open",
      tabId: tab.id,
    } satisfies ActionMessageSchema);

    console.log("response:", response);

    if (response === ("b-b-b-buffa" satisfies ActionResponse)) {
      // content script is up on this tab id
      return;
    }
  } catch (error) {
    console.log(
      `no content script loaded on tab id ${tab.id}, starting a new one`,
    );

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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "gimme-tab-id" && typeof sender.tab?.id === "number") {
    console.log("content script requested id, sent id", sender.tab.id);
    sendResponse(sender.tab.id);
  }
});
