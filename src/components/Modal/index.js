import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../components/Icon';

const ModalStyle = styled.div`
  padding: 1em;
  border: 2px solid;
  background: rgba(255,255,255,0.5);
  color: #000;
`;

class Modal extends React.Component {
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

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

export default Modal;