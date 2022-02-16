import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  DOMMessage,
  DOMMessageResponse,
  ILink,
} from './content-scripts/dom-evaluator';

const StyledListWrapper = styled.div``;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
  list-style-type: none;
`;

const StyledLink = styled.a`
  color: var(--color-primary);
  text-decoration: underline;
  &:hover {
    text-decoration: none;
    cursor: pointer;
    color: var(--color-accent);
  }
`;

const StyledHeader = styled.h1``;

export function App() {
  const [links, setLinks] = useState<ILink[]>([]);

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: 'GET_DOM' } as DOMMessage,
            (response: DOMMessageResponse) => {
              setLinks(response.links);
            }
          );
        }
      );
  }, []);
  return (
    <>
      <StyledHeader>Alternify</StyledHeader>
      <StyledListWrapper>
        <StyledList>
          {links.map((link, index: number) => (
            <StyledListItem key={`${index}${link.href}${link.text}`}>
              <StyledLink
                onClick={() => chrome.tabs.create({ url: link.href })}
              >
                {link.href}
              </StyledLink>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledListWrapper>
    </>
  );
}
