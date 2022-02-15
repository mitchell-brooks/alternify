import { Logo } from './logo';
import styled from 'styled-components';
export function App() {
  const TestWrapper = styled.div`
    background-color: red;
  `;
  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <TestWrapper>
        <p>
          <a
            class='link'
            href='https://preactjs.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn Preact
          </a>
        </p>
      </TestWrapper>
    </>
  );
}
