import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextAreaCSS = styled.textarea`
	border: 1px solid #000;
	background: #eee;
`;

const TextArea = (props) => (
	<div className="form-group">
		<div className="form-label">{props.title}</div>
		<TextAreaCSS
			className="form-input"
			style={props.resize ? null : {resize: 'none'}}
			name={props.name}
			rows={props.rows}
			cols={props.cols}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} />
	</div>
);

TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	cols: PropTypes.number,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
};

export default TextArea;