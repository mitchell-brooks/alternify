export interface DOMMessage {
  type: 'GET_DOM';
}

export interface DOMMessageResponse {
  title: string;
  links: [(MediaLink | undefined)[] | null, LinksDict | null];
}

export interface RelevantElementInfo {
  link: string | URL;
  //  text: string | null;
}
