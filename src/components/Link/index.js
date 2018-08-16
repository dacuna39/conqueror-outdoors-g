import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`

  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: bold;
  color: #eee;

  &:hover {
    text-decoration: none;
    color: #00a1ec;
  }
`;
