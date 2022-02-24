export type MediaType = 'album' | 'artist' | 'track' | 'playlist' | 'podcast';
export type Platform = 'Spotify' | 'Tidal' | 'Apple Music';

export interface MediaLink {
  link: string | URL;
  mediaType: MediaType;
  platform: Platform;
  uri: string;
}


type LinksDict = Record<Platform, Record<MediaType, MediaLink[]>>;
