import { LinksDict, MediaType, Platform } from '../types';
import { getDOMLinksArray } from './dom';
import { regexDict } from '@constants';

class MediaLink {
  constructor(
    public link: string | URL,
    public platform: Platform,
    public mediaType: MediaType,
    public uri: string
  ) {}
}

export const checkIfMediaLinks = (linkArr: string[]): [boolean, Platform[]] => {
  const platformsArray: Platform[] = [];
  for (let [platform, regex] of Object.entries(regexDict)) {
    for (let link of linkArr) {
      if (link.match(regex as RegExp)) {
        platformsArray.push(platform as Platform);
        break;
      }
    }
  }
  return [!!platformsArray.length, platformsArray];
};

export const getMediaLinks = (): [MediaLink[] | null, LinksDict | null] => {
  const linksDict = {} as LinksDict;
  const mediaLinks: MediaLink[] = getDOMLinksArray().reduce(
    (arr: MediaLink[], link) => {
      let mediaLink = (undefined as unknown) as MediaLink;
      const spotifyMatch = link.match(regexDict.spotify);
      if (spotifyMatch) {
        console.log('matching link');
        const mediaType = spotifyMatch[3] as MediaType;
        const platform = 'Spotify' as Platform;
        const uri = spotifyMatch[4];
        mediaLink = new MediaLink(
          (link as unknown) as URL,
          platform,
          mediaType,
          uri
        );
      }
      if (mediaLink) {
        arr.push(mediaLink);
        const { platform, mediaType } = mediaLink;
        if (!linksDict[platform]) {
          linksDict[platform] = {} as Record<MediaType, MediaLink[]>;
        }
        if (!linksDict[platform][mediaType]) {
          linksDict[platform][mediaType] = [mediaLink];
          return arr;
        }
        linksDict[platform][mediaType].push(mediaLink);
        return arr;
      }
      return arr;
    },
    []
  );
  return mediaLinks.length ? [mediaLinks, linksDict] : [null, null];
};
