import styled from 'styled-components';
import Woodsbackground from '../../images/woods-background.png';

const SiteBackground = styled.div`
  background: url(${Woodsbackground});
  background-size: 100% 100%;
  background-repeat: repeat;
  background-attachment: fixed;

  min-height: 55em;
  padding-bottom: 2em;
  color: #eee;
`;

export default SiteBackground
