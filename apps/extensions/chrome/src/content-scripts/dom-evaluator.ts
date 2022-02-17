import { getSpotifyInfo } from '../../../../../libs/spotify/spotify-api';

export interface DOMMessage {
  type: 'GET_DOM';
}

export interface DOMMessageResponse {
  title: string;
  links: (IMusicLink | undefined)[];
}

export interface IMusicLink extends IRelevantElementInfo {
  link_type: string | null;
  provider: 'Spotify' | 'Tidal' | 'Apple Music';
}

export interface IRelevantElementInfo {
  link: string;
  //  text: string | null;
}

const regexDict = {
  // match groups: 2 is embed 3 is album/artist/track 4 is ID string
  spotify: /(open\.spotify\.com\/)(embed\/)?(album|artist|track)\/([0-z]+(?=\?))?/,
};

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  console.log(getSpotifyInfo({ link_type: 'test', uri: 'test' }));
  //  const anchors: IRelevantElementInfo[] = Array.from(
  //    document.getElementsByTagName<'a'>('a')
  //  ).map((a) => ({ link: a.href, text: a.textContent || a.innerText || null }));
  //  const iFrames: IRelevantElementInfo[] = Array.from(
  //    document.getElementsByTagName<'iframe'>('iframe')
  //  ).map((iframe) => ({
  //    link: iframe.src,
  //    text: iframe?.contentWindow?.document.title || null,
  //  }));

  const aLinks = Array.from(document.getElementsByTagName<'a'>('a')).map(
    (a) => a.href
  );
  const iFrameLinks = Array.from(
    document.getElementsByTagName<'iframe'>('iframe')
  ).map((i) => i.src);

  const musicLinks: IMusicLink[] = [...aLinks, ...iFrameLinks].reduce(
    (arr: IMusicLink[], link) => {
      let spotifyMatch = link.match(regexDict.spotify);
      if (spotifyMatch) {
        arr.push({
          link: link,
          link_type: spotifyMatch[3] || null,
          provider: 'Spotify',
        });
      }
      return arr;
    },
    []
  );

  // Prepare the response object with information about the site
  const response: DOMMessageResponse = {
    title: document.title,
    links: musicLinks,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
