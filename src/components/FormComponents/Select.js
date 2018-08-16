import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectCSS = styled.select`
	border: 2px solid #282B24;
	background: #eee;
	font-size: 1em;
	padding: 2px 4px;
	color: #000;
	flex-wrap: nowrap;
`;

const Container = styled.div`
	margin-right: 10px;
`;

const Select = (props) => (
	<Container className="form-group">
		<div> {props.name} </div>
		<SelectCSS
			name={props.name}
			value={props.selectedOption}
			onChange={props.controlFunc}
			style={{width: props.width}}
			className="form-select"
			required={props.required}
		>
			{props.options.map(opt => {
				return (
					<option
						key={opt}
						value={opt}>{opt}</option>
				);
			})}
		</SelectCSS>
	</Container>
);

Select.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.string,
	controlFunc: PropTypes.func.isRequired,
	width: PropTypes.string,
	required: PropTypes.bool,
};

export default Select;