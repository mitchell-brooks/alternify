import { checkIfMediaLinks } from '../lib/media';
import { getDOMLinksArray } from '../lib/dom';

const DOMLinksArr = getDOMLinksArray();
const [hasLink, platformsArr] = checkIfMediaLinks(DOMLinksArr);
if (hasLink) {
  console.log(':::has link, should change browser icon');
  console.log(':::chrome', chrome);
  console.log(':::action', chrome.action);
  chrome.action.setIcon({ path: '../assets/icon-38-green.png' }, () =>
    console.log('callback from icon set')
  );
}
