import Wrapper from './Wrapper';

const WrapperWithBackground = Wrapper.extend`
  background: rgba(0, 0, 0, 0.65);
  -webkit-box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.65);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.65);
  color: #eee;
`;

export default WrapperWithBackground;
