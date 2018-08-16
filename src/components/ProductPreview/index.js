import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PrintPrice from '../../functions/PrintPrice';

import buttonStyles from '../../components/Button/buttonStyles';

const LinkStyle = styled(Link)`
	text-decoration: none;
	-webkit-font-smoothing: antialiased;
	-webkit-touch-callout: none;
	user-select: none;
	cursor: pointer;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-weight: bold;
	color: #eee;
`;

const ButtonStyle = styled.div`${buttonStyles}`;

const RedPrice = styled.div`
    color: #b22222;
    text-decoration: line-through;
`;

const Container = styled.div`
    text-align: center;
		font-weight: bold;
		
		background: none;
		border: 1px solid rgba(0,0,0,0);

		margin: 0 0.5em;
		margin-bottom: 0.5em;
    padding: 0.5em;
		width: 250px;
		height: 390px;
		
		&:hover {
			border: 1px solid #fff;
		}
`;

const ImageContainer = styled.div`
  width: 230px;
	height: 230px;
	background: #fff;
	color: #000;

	margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 0.25em;
`;

const ImgThumb = styled.img`
    max-width: 230px;
    max-height: 230px;
`;

function ProductPreview(props) {

	var price = props.price
	var salePrice = props.salePrice

	if (salePrice < price) {
		price = '$' + PrintPrice(price);
	}
	else {
		price = '';
	}

	if (window.location.href.includes('product')) { //if its on the product page, refresh the page with an a tag (change this later!)
		return (
			<Container onClick={props.clickFunc}>

					<ImageContainer>
						<ImgThumb src={props.img} alt={props.name} width={'auto'} height={'auto'} />
					</ImageContainer>

					<div style={{ height: '68px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{props.name}
					</div>
					<div style={{ height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<RedPrice> {price} </RedPrice> &nbsp;
						<div> ${PrintPrice(salePrice)} </div>
					</div>

					<ButtonStyle> More </ButtonStyle>

			</Container>
		);
	}
	else { // if not on product page, go to product page
		return (
			<Container>
				<LinkStyle to={'/product/' + props._id}>

					<ImageContainer>
						<ImgThumb src={props.img} alt={props.name} width={'auto'} height={'auto'} />
					</ImageContainer>

					<div style={{ height: '68px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						{props.name}
					</div>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<RedPrice> {price} </RedPrice> &nbsp;
						<div> ${PrintPrice(salePrice)} </div>
					</div>

					<ButtonStyle> More </ButtonStyle>

				</LinkStyle>
			</Container>
		);
	}
}

ProductPreview.propTypes = {
	_id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	salePrice: PropTypes.number.isRequired,
	clickFunc: PropTypes.func,
};

export default ProductPreview;