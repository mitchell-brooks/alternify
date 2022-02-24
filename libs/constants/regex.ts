export const regexDict: Record<string, RegExp> = {
  // match groups: 2 is embed 3 is album/artist/track 4 is ID string
  spotify:
    /(open\.spotify\.com\/)(embed\/)?(album|artist|track|playlist|podcast)\/([0-z]+(?=\?))?/,
};
