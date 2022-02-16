export interface DOMMessage {
  type: 'GET_DOM';
}

export interface DOMMessageResponse {
  title: string;
  links: ILink[];
}

export interface ILink {
  href: string;
  text: string;
}

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  const links = Array.from(document.getElementsByTagName<'a'>('a')).map(
    (a) => ({
      href: a.href,
      text: a.innerHTML,
    })
  );

  // Prepare the response object with information about the site
  const response: DOMMessageResponse = {
    title: document.title,
    links: links,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
