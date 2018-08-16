
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './css/w-iconfont.css';

const IconStyle = styled.i`
  font-size: 64px !important;
  font-weight: bold !important;
  color: #eee;
  padding: 16px;
  cursor: pointer;
`;

const BigIcon = (props) => (
  <IconStyle style={props.style} className={props.className} />
);

BigIcon.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string.isRequired,
}

export default BigIcon;