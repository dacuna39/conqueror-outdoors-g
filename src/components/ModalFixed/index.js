
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../components/Icon';

const ModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;

    min-width: 500px;
    min-height: 200px;

    margin-left: -250px;
    margin-top: -200px;
    z-index: 100;

    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    color: #eee;
    padding: 1em;
    border: 2px solid;
`;

class ModalFixed extends React.Component {
	render() {

		// Render nothing if the "show" prop is false
		if (!this.props.show) {
			return null;
		}

		return (
			<ModalStyle>
				<div onClick={this.props.onClose} style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Icon className='w-icon-close' />
				</div>
				{this.props.children}
			</ModalStyle>
		);
	}
}

ModalFixed.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

export default ModalFixed;