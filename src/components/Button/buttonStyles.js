import { css } from 'styled-components';

const buttonStyles = css`
  display: inline-block;
  width: auto;
  box-sizing: border-box;
  padding: 0.5em 1.5em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 18px;
  border: 2px solid #282B24;
  background: #007acc;
  color: #eee;

  &:hover {
    background: #ccc;
    color: #000;
    text-decoration: none;
  }

  &:active {
    background: #ccc;
    color: #282B24;
  }
`;

export default buttonStyles;
