import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
	border: 1px solid #282B24;
	background: #eee;
	font-size: 1em;
	color: #000;
	padding: 2px 4px;
`;

const SingleInput = (props) => (
	<div style={props.style} className="form-group" >
		<div> {props.title} </div>
		<Input
			className="form-input"
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder}
			size={props.size}
			maxLength={props.maxLength}
			required={props.required}
			onBlur={props.blurFunc}
			onKeyDown={props.onKeyDown}
		/>
	</div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number', 'email', 'password']).isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	required: PropTypes.bool,
	placeholder: PropTypes.string,
	size: PropTypes.number,
	maxLength: PropTypes.string,
	style: PropTypes.object,
	onKeyDown: PropTypes.func,
	blurFunc: PropTypes.func,
};

export default SingleInput;