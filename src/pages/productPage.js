/*
 *
 * ProductPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AddToCart as AddSnipCart} from 'react-snipcart';

import H1 from '../components/H1';
import H2 from '../components/H2';
import Button from '../components/Button';
//import buttonStyles from '../../components/Button/buttonStyles';
import BigIcon from '../components/Icon/BigIcon';
import ModalFixed from '../components/ModalFixed';
import BodyContainer from '../components/Containers/BodyContainer';

//import SingleInput from '../../components/FormComponents/SingleInput';
//import TextArea from '../../components/FormComponents/TextArea';
import Select from '../components/FormComponents/Select';
import ProductPreview from '../components/ProductPreview';
import SiteBackground from '../components/SiteBackground';

import SectionSmall from '../components/Containers/SectionSmall';
import Wrapper from '../components/Containers/Wrapper';
import WrapperWithBackground from '../components/Containers/WrapperWithBackground';
import WrapperLeft from '../components/Containers/WrapperLeft';

//import Modal from './Modal';
import ItemImgPreview from '../components/ProductPage/ItemImgPreview';
import SectionMinHeight from '../components/ProductPage/SectionMinHeight';

//functions
import GetNumberAtEndOfString from '../functions/GetNumberAtEndOfString';
import PrintPrice from '../functions/PrintPrice';

//actions
import { AddToCart } from '../actions/AddToCart';

//images
import stars from '../images/5stars.png';

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 1500px;
`;

const RedText = styled.div`
  color: #b22222;
  text-decoration: line-through;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    width: 700px;
    height: 525px;
`;

export class ProductPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);

    //console.log('snipcart', Snipcart.api);

    var allOptions = [{ name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] },
    { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] },
    { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] },
    { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] }, { name: '', choices: [''], prices: [0] }];

    this.sliderContent = [''];

    this.state = {
      showReviewModal: false,
      showAddCartModal: false,
      descriptionBoxSelected: 'Description',
      currentImage: '',

      //ensures that all state variables for options are not undefined by adding 15 empty fields
      //max options: 15 add more in alloptions and option11+ if needed
      options: allOptions,
      optionsSelected: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      optionPricesSelected: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],

      quantity: '1',
      totalPrice: 0.0,
      totalSalePrice: 0.0,

      reviewerName: '',
      reviewText: '',

      productId: 0,
      productForSale: {
        name: '',
        imagesArray: [],
        videos: '',
        options: [{ name: '', choices: [''], prices: [0] }],
        overview: '',
        price: 0,
        salePrice: 0,
        concept: '',
        description: '',
        reviews: [{ starValue: 0, text: '' }],

        _id: 0,
        brand: '',
        category: '',
        origin: '',
        releaseDate: Date.now(),
        numSales: 0,
        audience: '',
      },

      viewportWidth: window.innerWidth,
      relatedProducts: [{ //placeholder product so that the hot products container doesnt shrink due to empty data
        "name": "",
        "image": "",
        "price": 0,
        "salePrice": 0,
        "_id": 0,
        "brand": "",
        "category": "",
        "yearReleased": "",
        "numSales": "",
        "audience": "",
      }],
    }
  }

  defaultProductForSale = () => {
    this.setState({
      productForSale: {
        name: '',
        imagesArray: [],
        videos: '',
        options: [{ name: '', choices: [''], prices: [0] }],
        overview: '',
        price: 0,
        salePrice: 0,
        concept: '',
        description: '',
        reviews: [{ starValue: 0, text: '' }],

        _id: 0,
        brand: '',
        category: '',
        origin: '',
        releaseDate: Date.now(),
        numSales: 0,
        audience: '',
      },
      currentImage: '',
    })
  }

  componentDidMount() {

    var id = window.location.href;
    if (id.includes('#!/'))
      id = id.substring(0, window.location.href.indexOf('#!/'));
    console.log('id', id);

    this.productId = GetNumberAtEndOfString(id);
    console.log('id', id);
    
    this.fetchProduct(this.productId);
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  fetchProduct = (id) => {

    this.defaultProductForSale();

    window.scrollTo(0, 0);
    fetch('https://conqueror-db.herokuapp.com/products/200', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(result => {

        //console.log('result', result);
        var prodForSale = result;
        var optionsObject = JSON.parse(prodForSale.options);

        var allOptions = this.state.options;

        for (var i = 0; i < allOptions.length; i++) {
          if (optionsObject.options[i] !== undefined) {
            allOptions[i] = optionsObject.options[i];
          }
        }
        //console.log('alloptions', allOptions);

        //sets image urls to https for valid loading
        prodForSale.description = prodForSale.description.replace(/http/g, 'https');
        prodForSale.description = prodForSale.description.replace(/httpss/g, 'http');

        this.sliderContent = prodForSale.concept.split(',');
        //console.log('slidercontent', this.sliderContent);
        
        var descriptionSelect = 'Images';
        if (prodForSale.description.length > 11)
          descriptionSelect = 'Description'

        this.setState({
          productForSale: prodForSale,
          totalPrice: prodForSale.price,
          totalSalePrice: prodForSale.salePrice,

          currentImage: prodForSale.imagesArray[0],
          descriptionBoxSelected: descriptionSelect,

          options: allOptions,
          optionsSelected: [allOptions[0].choices[0], allOptions[1].choices[0], allOptions[2].choices[0], allOptions[3].choices[0],
          allOptions[4].choices[0], allOptions[5].choices[0], allOptions[6].choices[0], allOptions[7].choices[0],
          allOptions[8].choices[0], allOptions[9].choices[0], allOptions[10].choices[0], allOptions[11].choices[0]],

          optionPricesSelected: [allOptions[0].prices[0], allOptions[1].prices[0], allOptions[2].prices[0], allOptions[3].prices[0],
          allOptions[4].prices[0], allOptions[5].prices[0], allOptions[6].prices[0], allOptions[7].prices[0],
          allOptions[8].prices[0], allOptions[9].prices[0], allOptions[10].prices[0], allOptions[11].prices[0]],

        }, () => this.fetchRelatedProducts());
      })//end then
      .catch(error => console.error('Error:', error));
  }

  fetchRelatedProducts = () => {

    var cat = this.state.productForSale.category.split(',');
    //console.log('cat', cat);
    fetch('https://conqueror-db.herokuapp.com/searchFilters/tags=null&filter=Newest&brand=All&category=' + cat[0] +
      '&audience=All&pageNum=1&set=default', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(data => {
        //console.log(results);
        this.setState({ relatedProducts: data.results });
      })
      .catch(error => console.error('Error:', error));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  renderDescriptionElements() {

    if (this.state.descriptionBoxSelected === 'Description') {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.state.productForSale.description }} />
      );
    }
    else if (this.state.descriptionBoxSelected === 'Images') {
      return (
        <Carousel className='conceptImages' slidesToShow={1} slidesToScroll='auto' initialSlideHeight={1000} wrapAround={true}
          renderCenterLeftControls={({previousSlide}) => (<div onClick={previousSlide}><BigIcon className='w-icon-arrow-left' /> </div>)}
          renderCenterRightControls={({nextSlide}) => (<div onClick={nextSlide}><BigIcon className='w-icon-arrow-right' /> </div>)}
        >
          {this.sliderContent.map((image, index) => {
            return (
              <Wrapper key={index} style={{ width: '1100px', height: '1000px', margin: 'auto', alignItems: 'center'}}>
                <img key={index} src={image} alt={image}
                  style={{ maxWidth: '1100px', maxHeight: '1000px'}}
                />
              </Wrapper>
            );
          })}
        </Carousel>
      );
    }
    else if (this.state.descriptionBoxSelected === 'Our Service') {
      return (
        <p> Our service info... </p>
      );
    }
    else if (this.state.descriptionBoxSelected === 'How To Order') {
      return (
        <p> Instructions on How to Order </p>
      );
    }
    else if (this.state.descriptionBoxSelected === 'Videos') {
      return (
        <Wrapper style={{ justifyContent: 'center' }}>
          <div dangerouslySetInnerHTML={{ __html: this.state.productForSale.videos }} />
        </Wrapper>
      );
    }
    else {
      return null;
    }
  }

  updateDimensions = () => { this.setState({ viewportWidth: window.innerWidth }) }
  toggleReviewModal = () => { this.setState({ showReviewModal: !this.state.showReviewModal }) }

  clickDescription = (e) => {
    this.setState({ descriptionBoxSelected: 'Description' })
  }
  clickImages = (e) => {
    this.setState({ descriptionBoxSelected: 'Images' })
  }
  clickOurService = (e) => {
    this.setState({ descriptionBoxSelected: 'Our Service' })
  }
  clickHowToOrder = (e) => {
    this.setState({ descriptionBoxSelected: 'How To Order' })
  }
  clickVideos = (e) => {
    this.setState({ descriptionBoxSelected: 'Videos' })
  }

  renderDescriptionButton = () => {
    if (this.state.productForSale.description.length > 11) {
      return (
        <SectionSmall style={{ paddingBottom: '8px', borderBottom: '4px solid #00a1ec' }}>
          <Button onClick={this.clickDescription}> Description </Button>
        </SectionSmall>
      );
    }
  }

  renderVideosButton = () => {
    if (this.state.productForSale.videos.length > 0) {
      return (
        <SectionSmall style={{ paddingBottom: '8px', borderBottom: '4px solid #00a1ec' }}>
          <Button onClick={this.clickVideos}> Videos </Button>
        </SectionSmall>
      );
    }
  }
  renderImagesButton = () => {
    if (this.sliderContent[0].length > 0) {
      return (
        <SectionSmall style={{ paddingBottom: '8px', borderBottom: '4px solid #00a1ec' }}>
          <Button onClick={this.clickImages}> Images </Button>
        </SectionSmall>
      );
    }
  }

  handleCurrentImage = (e) => { this.setState({ currentImage: e.target.value }) }

  handleOptionSelect = (index, e) => {
    var opts = this.state.optionsSelected;
    var prices = this.state.optionPricesSelected;

    for (var i = 0; i < opts.length; i++) {
      if (i === index) {
        opts[i] = e.target.value;
        prices[i] = this.state.options[index].prices[this.state.options[index].choices.indexOf(e.target.value)];
      }
    }
    //console.log('new opts', opts);
    //console.log('new prices', prices);

    this.calculatePrice();

    this.setState({
      optionsSelected: opts,
      optionPricesSelected: prices,
    });
  }

  handleQuantitySelect = (e) => { this.setState({ quantity: e.target.value }, () => this.calculatePrice()) }
  handleReviewerName = (e) => { this.setState({ reviewerName: e.target.value }) }
  handleReviewText = (e) => { this.setState({ reviewText: e.target.value }) }

  clickPreview = (e) => {
    this.setState({ currentImg: e.target.value })
  }

  returnProductsList = (productsList) => {
    //console.log(productsList)
    if (productsList !== null) {
      return productsList.map((product, index) => {

        if (index <= 16) {
          return (
            <ProductPreview
              key={index}
              _id={product._id}
              name={product.name}
              img={product.image}
              price={product.price}
              salePrice={product.salePrice}
              clickFunc={() => this.fetchProduct(product._id)}
            />
          );
        }
        return null;
      })//end map
    }
    else {
      return (
        <h3> Loading... </h3>
      );
    }
  }

  addToCart = () => {
    var opts = [];

    for (var a = 0; a < this.state.options.length; a++) {
      if (this.state.options[a].name.length > 1) {
        opts.push({
          name: this.state.options[a].name,
          choice: this.state.optionsSelected[a],
          price: this.state.optionPricesSelected[a],
        })
      }
    }
    //console.log('opts', opts);
    /*
    this.props.AddToCart(this.state.productForSale._id, this.state.productForSale.name,
      this.state.productForSale.imagesArray[0], this.state.productForSale.category.replace(/,/g, ' ').replace('undefined', ''),
      this.state.quantity, this.state.totalPrice, this.state.totalSalePrice, opts,
      this.state.productForSale.weightPounds, this.state.productForSale.weightOunces, this.state.productForSale.dimensions);
    //totalprices are not multiplied by quantity at this point, so this is fine
      */
    this.setState({ showAddCartModal: true });
  }

  renderImagePreviews = () => {
    //console.log('productforsale', this.state.productForSale.imagesArray);
    return this.state.productForSale.imagesArray.map((image, index) => {
      //if (index < 3) //temporary solution
      return (
        <ItemImgPreview
          key={index}
          clickFunc={() => this.setState({ currentImage: image })}
          src={image}
          alt={'Preview'}
        />
      );
    })
  }

  renderOptions = () => {
    var options = [];

    if (this.state.options[0].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[0].name}
          options={this.state.options[0].choices}
          selectedOption={this.state.optionsSelected[0]}
          controlFunc={(e) => this.handleOptionSelect(0, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[1].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[1].name}
          options={this.state.options[1].choices}
          selectedOption={this.state.optionsSelected[1]}
          controlFunc={(e) => this.handleOptionSelect(1, e)}
          width={'215px'}
        />

      );
    }
    if (this.state.options[2].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[2].name}
          options={this.state.options[2].choices}
          selectedOption={this.state.optionsSelected[2]}
          controlFunc={(e) => this.handleOptionSelect(2, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[3].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[3].name}
          options={this.state.options[3].choices}
          selectedOption={this.state.optionsSelected[3]}
          controlFunc={(e) => this.handleOptionSelect(3, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[4].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[4].name}
          options={this.state.options[4].choices}
          selectedOption={this.state.optionsSelected[4]}
          controlFunc={(e) => this.handleOptionSelect(4, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[5].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[5].name}
          options={this.state.options[5].choices}
          selectedOption={this.state.optionsSelected[5]}
          controlFunc={(e) => this.handleOptionSelect(5, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[6].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[6].name}
          options={this.state.options[6].choices}
          selectedOption={this.state.optionsSelected[6]}
          controlFunc={(e) => this.handleOptionSelect(6, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[7].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[7].name}
          options={this.state.options[7].choices}
          selectedOption={this.state.optionsSelected[7]}
          controlFunc={(e) => this.handleOptionSelect(7, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[8].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[8].name}
          options={this.state.options[8].choices}
          selectedOption={this.state.optionsSelected[8]}
          controlFunc={(e) => this.handleOptionSelect(8, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[9].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[9].name}
          options={this.state.options[9].choices}
          selectedOption={this.state.optionsSelected[9]}
          controlFunc={(e) => this.handleOptionSelect(9, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[10].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[10].name}
          options={this.state.options[10].choices}
          selectedOption={this.state.optionsSelected[10]}
          controlFunc={(e) => this.handleOptionSelect(10, e)}
          width={'215px'}
        />
      );
    }
    if (this.state.options[11].choices.length > 1) {
      options.push(
        <Select
          name={this.state.options[11].name}
          options={this.state.options[11].choices}
          selectedOption={this.state.optionsSelected[11]}
          controlFunc={(e) => this.handleOptionSelect(11, e)}
          width={'215px'}
        />
      );
    }

    return options.map((renderOption, index) => {
      return (
        <div key={index}>
          {renderOption}
        </div>
      );
    });
  }

  calculatePrice = () => {

    var salePrice = this.state.productForSale.salePrice;
    var totalPrice = this.state.productForSale.price;

    salePrice += this.state.optionPricesSelected[0] + this.state.optionPricesSelected[1] + this.state.optionPricesSelected[2] +
      this.state.optionPricesSelected[3] + this.state.optionPricesSelected[4] + this.state.optionPricesSelected[5] +
      this.state.optionPricesSelected[6] + this.state.optionPricesSelected[7] + this.state.optionPricesSelected[8] +
      this.state.optionPricesSelected[9] + this.state.optionPricesSelected[10] + this.state.optionPricesSelected[11];

    totalPrice += this.state.optionPricesSelected[0] + this.state.optionPricesSelected[1] + this.state.optionPricesSelected[2] +
      this.state.optionPricesSelected[3] + this.state.optionPricesSelected[4] + this.state.optionPricesSelected[5] +
      this.state.optionPricesSelected[6] + this.state.optionPricesSelected[7] + this.state.optionPricesSelected[8] +
      this.state.optionPricesSelected[9] + this.state.optionPricesSelected[10] + this.state.optionPricesSelected[11];
    //console.log('totalSale', salePrice);
    //console.log('totalprice', totalPrice);

    this.setState({ totalPrice: totalPrice, totalSalePrice: salePrice });
  }

  renderPrice = () => {

    var totalPrice = this.state.totalPrice;
    var totalSalePrice = this.state.totalSalePrice;

    if (totalSalePrice < totalPrice) {
      return (
        <SectionSmall>
          <RedText> ${PrintPrice(totalPrice * this.state.quantity)} </RedText>
          <div> ${PrintPrice(totalSalePrice * this.state.quantity)} </div>
        </SectionSmall>
      );
    }
    else {
      return (
        <SectionSmall style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div> ${PrintPrice(totalSalePrice * this.state.quantity)} </div>
        </SectionSmall>
      );
    }
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Product Page</title>
          <meta name="description" content="Description of Product Page" />
        </Helmet>

        <ModalFixed show={this.state.showAddCartModal} onClose={() => this.setState({ showAddCartModal: !this.state.showAddCartModal })}>
          <h2> Item Added </h2>
          <Wrapper style={{ justifyContent: 'center' }}>
            <Button onClick={() => this.props.history.push('/shop')} style={{ margin: '0 1em' }}> Keep Shopping </Button>
            <Button onClick={() => this.props.history.push('/cart')} style={{ margin: '0 1em' }}> View Cart </Button>
          </Wrapper>
        </ModalFixed>


        <SiteBackground className='site-background'>

          <BodyContainer className='product-overview' style={{ padding: 0, paddingTop: '11em', margin: 0 }}>

            <WrapperWithBackground style={{ justifyContent: 'center', flexWrap: 'wrap', width: 'auto', height: 'auto', margin: '0 auto' }}>
              <section className='left-section' style={{ maxWidth: '800px', margin: '1.75em' }}>
                <Wrapper style={{ justifyContent: 'center' }}>
                  <section>
                    <ImageContainer>
                      <img src={this.state.currentImage} width='auto' height='auto' style={{ maxWidth: 700, maxHeight: 525 }} alt={this.state.productForSale.name} />
                    </ImageContainer>
                    <div className='render-image-previews-container'
                      style={{ width: '700px', height: '100px', display: 'flex', justifyContent: 'center' }}
                    >
                      {this.renderImagePreviews()}
                    </div>
                  </section>
                  {/*}
                    <section>
                      <div className='render-image-previews-container' 
                           style={{ width: '150px', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                      >
                        {this.renderImagePreviews()}
                      </div>
                    </section>
                    */}

                </Wrapper>
              </section>

              <section className='right-section' style={{ width: 'auto', maxWidth: '450px', margin: '1.75em' }}>
                <H1 style={{ textAlign: 'left' }}> {this.state.productForSale.name} </H1>

                <h3> {this.state.productForSale.overview} </h3>

                <Wrapper style={{ justifyContent: 'flex-start' }}>
                  <section style={{ width: 'auto' }}>
                    <div> - Brand: {this.state.productForSale.brand} </div>
                    <div> - Category: {this.state.productForSale.category.replace(/,/g, ' ').replace('undefined', '')} </div>
                  </section>
                  <section style={{ width: 'auto', paddingLeft: '8px' }}>
                    <div> - For: {this.state.productForSale.audience} </div>
                    <div> - {this.state.productForSale.origin} </div>
                  </section>
                </Wrapper>
                <br />

                <Wrapper style={{ flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                  {this.renderOptions()}
                </Wrapper>
                <br />

                <Wrapper style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <SectionSmall>
                    <Select
                      name={'Quantity'}
                      options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                      selectedOption={this.state.quantity}
                      controlFunc={this.handleQuantitySelect}
                    />
                  </SectionSmall>
                  &nbsp;
                    {this.renderPrice()}
                  &nbsp;
                    <SectionSmall style={{ display: 'flex', alignItems: 'center' }}>

                    <AddSnipCart data={{
                        id: this.state.productForSale._id.toString(),
                        name: this.state.productForSale.name,
                        url: '/',
                        price: PrintPrice(this.state.productForSale.salePrice),
                        image: this.state.productForSale.imagesArray[0],
                        description: this.state.productForSale.overview,
                        weight: '1000', // in grams
                        //length: '', // in centimeters
                        //width: '', 
                        //height: '',
                        metadata: {
                          id: this.state.productForSale._id.toString(),
                          name: this.state.productForSale.name,
                          url: '/',
                          price: PrintPrice(this.state.productForSale.salePrice)
                        },
                        openCart: true,
                    }}>

                      <Button>
                        Add To Cart
                      </Button>

                    </AddSnipCart>

                  </SectionSmall>
                </Wrapper>

                <img style={{ paddingTop: '2em' }} src={stars} alt='stars' width='200px' height='auto' />
              </section>
            </WrapperWithBackground>

          </BodyContainer>



          <PageContainer className='page-container' style={{ marginTop: '3.5em' }}>
            <BodyContainer style={{ background: 'rgba(0, 0, 0, 0.65)', WebkitBoxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.65)', boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.65)' }}>
              <section>
                <WrapperLeft style={{ flexWrap: 'wrap', paddingLeft: '8px' }}>
                  {this.renderDescriptionButton()}
                  {this.renderImagesButton()}
                  <SectionSmall style={{ paddingBottom: '8px', borderBottom: '4px solid #00a1ec' }}> <Button onClick={this.clickOurService}> Our Service </Button> </SectionSmall>
                  <SectionSmall style={{ paddingBottom: '8px', borderBottom: '4px solid #00a1ec' }}> <Button onClick={this.clickHowToOrder}> How To Order </Button> </SectionSmall>
                  {this.renderVideosButton()}
                </WrapperLeft>
              </section>

              <SectionMinHeight>
                {this.renderDescriptionElements()}
              </SectionMinHeight>
            </BodyContainer>

            {/* Review Code, add when reviews are implemented }
            <BodyContainer style={{ background: 'rgba(0, 0, 0, 0.65)', WebkitBoxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.65)', boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.65)' }}>
              <h2>Current Reviews </h2>
              <WrapperLeft>
                <Button onClick={this.toggleReviewModal}> Write a Review </Button>
              </WrapperLeft>

              <Modal show={this.state.showReviewModal} onClose={this.toggleReviewModal}>
                <form onSubmit={() => { alert("reviewed") }}>
                  <WrapperLeft>
                    <section>
                      <div> Your Name </div>
                      <SingleInput
                        inputType={'text'}
                        title={'Reviewer Name'}
                        name={'ReviewerName'}
                        controlFunc={this.handleReviewerName}
                        content={this.state.reviewerName}
                      />
                      <br />
                    </section>
                    <section >
                      <i className={'w-icon-star-off'} />
                      <i className={'w-icon-star-off'} />
                      <i className={'w-icon-star-off'} />
                      <i className={'w-icon-star-off'} />
                      <i className={'w-icon-star-off'} />
                    </section>
                  </WrapperLeft>

                  <TextArea
                    title={'Review Text'}
                    rows={6}
                    cols={40}
                    name={'ReviewerText'}
                    controlFunc={this.handleReviewText}
                    content={this.state.reviewText}
                  />

                  {/* <input type='submit' value='Submit Review' /> *
                  <Button form=''> Submit </Button>
                </form>
              </Modal>

              <p> 0 out of 0 Reviews </p>
              <p> Be the first to write a review! </p>
            </BodyContainer>

            {/* 
          * related products
          */}

            <BodyContainer className='related-products'>
              <H2> Related Products </H2>
              <WrapperWithBackground>
                <Carousel className={'hot-products'} slidesToShow={Math.floor((this.state.viewportWidth * 0.75) / 260)} slidesToScroll={'auto'} framePadding={'1em 1.5em'} initialSlideHeight={410} >
                  {this.returnProductsList(this.state.relatedProducts)}
                </Carousel>
              </WrapperWithBackground>
            </BodyContainer>

          </PageContainer>

        </SiteBackground>
      </article>
    );
  }
}

export default ProductPage;

/*
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ AddToCart: AddToCart }, dispatch);
}

export default withRouter(connect(null, matchDispatchToProps)(ProductPage));
*/
