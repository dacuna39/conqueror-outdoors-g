import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../components/Button';

const ModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    margin-left: -250px;
    margin-top: -200px;
    z-index: 100;

    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    color: #eee;
    padding: 1em;
    border: 2px solid;
`;

class Modal extends React.Component {
    render() {

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return (
            <ModalStyle>
                <div>
                    {this.props.children}
                    <div className="footer">
                        <Button onClick={this.props.onClose}> Close </Button>
                    </div>
                </div>
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