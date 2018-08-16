import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Preview = styled.div`
  margin: 0 10px;
  margin-top: 8px;
	cursor: pointer;
	border: 1px solid #eee;
  width: 80px;
  height: 80px;
	
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Img = styled.img`
  max-width: 80px;
  max-height: 80px;
`;

const ItemImgPreview = (props) => {
	return (
		<Preview onClick={props.clickFunc}>
			<Img src={props.src} alt={props.alt} width={'auto'} height={'auto'} />
		</Preview>
	);
}

ItemImgPreview.propTypes = {
	clickFunc: PropTypes.func,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};

export default ItemImgPreview;