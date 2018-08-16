import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
	border: 2px solid #282B24;
	background: #eee;
	font-size: 18px;
	color: #000;
	height: 32px;
	padding: 2px 4px;
`;

const SingleInput = (props) => (
	<div className="form-group" >
		<Input
			className="form-input"
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} />
	</div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number', 'password']).isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;