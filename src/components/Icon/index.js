import React from 'react';
import PropTypes from 'prop-types';
import './css/w-iconfont.css';
import IconStyle from './IconStyle';

const Icon = (props) => (
    <IconStyle style={props.style} className={props.className} />
);

Icon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string.isRequired,
}

export default Icon;