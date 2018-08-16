import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Img from '../../components/Img';
import Link from '../../components/Link';

const ImageContainer = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  margin: 1em;
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%; // constrain caption to img size
  background: rgba(0, 0, 0, 0.7);

  font-size: 1.3em;

  text-align: center;
  line-height: 200%;

  &:hover {
    background: #eee;
    color: #000;
  }
`;

const ImageWithCaption = (props) => {
    return (
        <ImageContainer onClick={() => props.clickFunc}>
            <Link to={props.to} onClick={() => window.scrollTo(0,0)}>
                <Img src={props.src} alt={props.alt} width={'100%'} />
                <ImageCaption> {props.caption} </ImageCaption>
            </Link>
          </ImageContainer>
    );
}

ImageWithCaption.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    caption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.element,
    ]),
    to: PropTypes.string.isRequired,
    clickFunc: PropTypes.func,
}

export default ImageWithCaption;