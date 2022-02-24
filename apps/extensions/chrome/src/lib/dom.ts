export const getDOMLinksArray = (): string[] => {
  const aLinks = Array.from(document.getElementsByTagName<'a'>('a')).map(
    (a) => a.href
  );
  const iFrameLinks = Array.from(
    document.getElementsByTagName<'iframe'>('iframe')
  ).map((i) => i.src);
  return [...aLinks, ...iFrameLinks];
};
